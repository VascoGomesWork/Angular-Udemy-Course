import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LogginService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-project-1';

  constructor(private authService: AuthService, private loggingService: LogginService){}

  ngOnInit(): void {
    this.authService.autoLogin()
    this.loggingService.printLog("Hello From the App Component ngOnInit")
  }
}
