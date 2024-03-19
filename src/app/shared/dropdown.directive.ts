import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  //Binding to the class property of class open
  @HostBinding('class.open')isOpen: boolean

  constructor() { }

  ngOnInit(){
    this.isOpen = false
  }

  @HostListener('click') toggleOpen(eventData: Event){
    this.isOpen = !this.isOpen
  }


}
