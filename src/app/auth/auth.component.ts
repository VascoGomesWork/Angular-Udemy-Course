import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnDestroy{

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver){}

  isLoginMode = true
  isLoading = false
  error : String = null
  //ViewChild is used to access to ng-template in the template file
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective
  private closeSub: Subscription

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm){

    if(!form.valid){
      return
    }

    const email = form.value.email
    const password = form.value.password
    this.isLoading = true

    let authObs: Observable<AuthResponseData>

    if(this.isLoginMode){
      //Loggin Mode
      authObs = this.authService.login(email, password)

    } else{
      //Sign Up Mode
      authObs = this.authService.signUp(email, password)
    }

    //Subscription Lives Here
    authObs.subscribe((resData) => {

      //Success Login/SignUp
      console.log(resData)
      this.isLoading = false

      this.router.navigate(['/recipes'])

    }, errorMessage => {
      
      //Error Login/SignUp
      console.log(errorMessage)
      this.isLoading = false
      this.error = errorMessage
      this.showErrorAlert(errorMessage)
      
    }
  )
    
    form.reset()
  }

  onHandleError(){
    this.error = null
  }

  private showErrorAlert(message: string){
    //Creating a component programatically
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
    //Uses the alertHost to access
    const hostViewContainerRef = this.alertHost.viewContainerRef
    hostViewContainerRef.clear()

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory)

    componentRef.instance.message = message
    this.closeSub = componentRef.instance.close.subscribe(() => {
        this.closeSub.unsubscribe()
        hostViewContainerRef.clear()
    })
  }

  ngOnDestroy(): void {
    //If exists a subscription open, unsubscribes
    if(this.closeSub){
      this.closeSub.unsubscribe()
    }
  }

}
