/**
 * an-loader component.
 * 
 * <an-loader *ngIf="boolean"></an-loader>
 */

import { Component, ElementRef, Renderer2, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoaderQuery } from '../../stores/loader/loader.query';

import { MathService } from '../../services/math/math.service';

@Component({
  selector: 'an-loader',
  templateUrl: './loader.html'
})

export class LoaderComponent implements AfterViewInit, OnDestroy {
  
  @ViewChild('loader') private loaderElement: ElementRef;

  private subscription: Subscription = new Subscription; 
  
  private loader: any;
  private cont: number = 0; // Control variable about loader.
  
  constructor(
    private renderer: Renderer2,
    private loaderQuery: LoaderQuery,
    private mathService: MathService,
  ){}

  ngAfterViewInit() {
    this.subscription.add(this.loaderQuery.isLoading$.subscribe( isloading => {
      (isloading) 
        ? this.LoaderAnimate(500)
        : clearInterval(this.loader);
      }));
  }

  /**
   * @description It animates loader bar.
   * @param time Number ms
   */
  private LoaderAnimate(time: number) { 
    
    let width:number = 0;
    let random: number;

    this.cont ++;

    if ( this.cont > 1 ) {
      this.cont = 0;
      width = 0;
      clearInterval(this.loader);
    }

    this.loader = setInterval(() => {
      width += this.mathService.getRandomInt(1, 3) * 10;
      (width > 100 )
        ? width = 0
        : this.renderer.setStyle(this.loaderElement.nativeElement, 'width', width + '%')
    }, time);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

