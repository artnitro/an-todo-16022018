/**
 * an-menu-dropdown component.
 * 
 * <an-menu-dropdown [position]="position" [menuData]="menuData" [eventName]="eventNameEmitted" *ngIf="condition"></an-menu-dropdown>
 */

import { Component, Input, ElementRef, Renderer2, AfterViewInit, ViewChild} from '@angular/core';

import { EventEmitterService, EventData } from '../../services/event/eventemitter.service';

@Component({
  selector: 'an-menu-dropdown',
  templateUrl: './menudropdown.html'
})

export class MenudropdownComponent implements AfterViewInit {

  @ViewChild('pointer') private pointerElement: ElementRef;
  @ViewChild('dropdown') private dropdownElement: ElementRef;

  @Input() position: any;
  @Input() menuData: any;
  @Input() eventName: string;

  constructor(
    private renderer: Renderer2,
    private eventEmitter: EventEmitterService,
  ) {}

  ngAfterViewInit() {
    // Pointer position. 

    let xPointer = this.position.xPosition - Math.round(this.pointerElement.nativeElement.getBoundingClientRect().width / 2);
    let yPointer = this.position.yPosition;
    let bleeding = 10;

    // Dropdown position.

    let xDropdown = this.position.xPosition - Math.round(this.dropdownElement.nativeElement.getBoundingClientRect().width / 2);

    if ( (xDropdown + this.dropdownElement.nativeElement.getBoundingClientRect().width) >= this.position.windowWidth ) {
      xDropdown = this.position.windowWidth - Math.round(this.dropdownElement.nativeElement.getBoundingClientRect().width) - bleeding;
    }

    let yDropdown = this.position.yPosition + Math.round(this.pointerElement.nativeElement.getBoundingClientRect().height)

    // Render dropdown position.

    this.renderer.setStyle(this.pointerElement.nativeElement, 'top', yPointer + 'px');
    this.renderer.setStyle(this.pointerElement.nativeElement, 'left', xPointer + 'px');

    this.renderer.setStyle(this.dropdownElement.nativeElement, 'top', yDropdown + 'px');
    this.renderer.setStyle(this.dropdownElement.nativeElement, 'left', xDropdown + 'px');
  }

  onClick(data) {
    this.eventEmitter.emit(this.eventName, data);
  }

  trackElement(index: number, data: any) {
    return data ? data.id : null
  }
}
