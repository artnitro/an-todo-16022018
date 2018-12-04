/**
 * an-message component.
 * 
 * <an-message [message]="variable" [ngStyle]="{'color': variable}"></an-message>
 */

 import { Component, Input } from '@angular/core' ;

@Component({
  selector: 'an-message',
  templateUrl: './messsage.html'
})

export class MessageComponent {

  @Input() message: string;

}