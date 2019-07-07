/**
 * an-input component.
 * 
 * <an-input [name]="string" [color]="any" [text]="string"></an-input>
 */

import { Component, Input} from '@angular/core';

@Component({
  selector: 'an-input',
  templateUrl: './input.html'
})

export class InputComponent {

  @Input() name: string;
  @Input() color: any;
  @Input() text: string;

}
