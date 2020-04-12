/**
 * Math service.
 */

import { Injectable } from '@angular/core';

@Injectable() 

export class MathService {

  /**
   * @description Get random number between inclusive min and max.
   * @param min Number
   * @param max Number
   * @returns number int
   */
  getRandomInt(min, max):number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

}