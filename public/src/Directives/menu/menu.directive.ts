/**
 * Menu toggle directive.
 * 
 * I am using it for showing or hiding menus.
 * The tag where I want to show the menu.
 * 
 * <tag an-menu #menu="an-menu">...</tag>
 * 
 * The tag that it has to be showed or hided.
 * 
 * <tag *ngIf="menu.toggled">...</tag>
 */

 import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

 export interface Coordinate {
   [name: string]: number
 }

 @Directive({
  selector: '[an-menu]',
  exportAs: 'an-menu'
 })

export class MenuDirective {

  toggled: boolean = false;
  elPosition: Coordinate = {
    xPosition: 0,
    yPosition: 0,
    windowWidth: 0,
    windowHeight: 0 
  }

  constructor(private el: ElementRef) {}

  @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
      this.elPosition.xPosition = Math.round((this.el.nativeElement.getBoundingClientRect().width / 2 ) + this.el.nativeElement.getBoundingClientRect().x);
      this.elPosition.yPosition = Math.round(this.el.nativeElement.getBoundingClientRect().height + this.el.nativeElement.getBoundingClientRect().y);
      this.elPosition.windowWidth = window.innerWidth;
      this.elPosition.windowHeight = window.innerHeight; 
      event.stopPropagation();
      this.toggled = !this.toggled;
    }

  @HostListener('document:click', ['$event'])
    clickout(event: MouseEvent) {
      this.toggled = false;
    }
    
  @HostListener('window:resize', ['$event'])
    onResize(event: MouseEvent) {
      this.elPosition.windowWidth = window.innerWidth;
      this.elPosition.windowHeight = window.innerHeight;     
      this.toggled = false;
    }
}
