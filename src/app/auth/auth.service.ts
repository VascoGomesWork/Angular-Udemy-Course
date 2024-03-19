import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment"

export interface AuthResponseData {
    kind: string
    idToken: string
    email: string
    refreshToken: string
    expiresIn: string
    localId: string
    registered?: boolean
}

@Injectable()
export class AuthService{

    user = new BehaviorSubject<User>(null)
    private tokenExpirationTimer: any

    constructor(private http: HttpClient, private router: Router){}

    //Sends Post Request to Firebase
    signUp(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
            })
        )
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
            ).pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
                })
            )
    }

    autoLogin(){
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'))
        if(!userData){
            return
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))

        //Checks if the User has a valid token
        if(loadedUser.getToken()) {
            this.user.next(loadedUser)
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
            this.autoLogout(expirationDuration)
        }
    }

    logout(){
        //Sets the User to Null, there fore logs it out
        this.user.next(null)
        this.router.navigate(['/auth'])
        localStorage.removeItem('userData')
        //Checks if there is any token expiration timer to clear
        if(this.tokenExpirationTimer){
            //Clears the Timeout
            clearTimeout(this.tokenExpirationTimer)
        }
        this.tokenExpirationTimer = null
    }

    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout()
        }, expirationDuration)
    }

    private handleAuthentication(email:string, userId:string, token: string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000)
        const user = new User(email, userId, token, expirationDate)
        this.user.next(user)  
        //Sets the logout timer to the user token
        this.autoLogout(expiresIn * 1000)
        //Saves Item in Local Storage
        localStorage.setItem('userData', JSON.stringify(user))
    }

    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = "An unknown error ocurred!"
        console.log(errorRes)
        console.log(errorRes.error.error)
        //Checks if the error has the following format
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage)
        }

        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage = "This email already exists!"
                break;

            case 'INVALID_LOGIN_CREDENTIALS':
                errorMessage = "Invalid login credentials!"
                break;
        }
        //throwError throws an Observable
        return throwError(errorMessage)
    }

}