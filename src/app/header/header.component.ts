import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  collapsed = true;
  private userSub: Subscription
  isAuthenticated = false

  //Event Emitter to emit to the parent component, in this case the app-component
  @Output() featureSelected = new EventEmitter<string>()

  constructor(private dataStorageService: DataStorageService, private authService: AuthService){}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true
    })
  }

  onSelect(feature:string){
    this.featureSelected.emit(feature)
  }

  onSaveDate(){
    this.dataStorageService.storeRecipes()
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe()
  }

  onLogout(){
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }
}
