import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map, take } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private authService: AuthService, private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean | UrlTree> | Promise<boolean| UrlTree> {
        //Gets the latest User value and unsubscribes so we don't have an ongoing listner that we don't need
        return this.authService.user.pipe(take(1), map(user => {
            //Returns True or False
            const isAuth = !!user

            if(isAuth){
                return true
            }
            return this.router.createUrlTree(['/auth'])
        }))
    }
}