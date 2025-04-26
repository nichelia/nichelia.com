import { Component, AfterViewInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Clock } from './clock';

@Component({
  selector: 'app-canvas-clock',
  templateUrl: './canvas-clock.component.html',
  styleUrls: ['./canvas-clock.component.css']
})
export class CanvasClockComponent implements AfterViewInit
{

  @ViewChild('scene', {read: ElementRef, static:false}) elementView: ElementRef;
  private canvas;
  private renderer;
  private animationRequest;

  constructor(private ngZone: NgZone) { }

  ngAfterViewInit(): void
  {
    this.init();
  }

  ngOnDestroy(): void
  {
    cancelAnimationFrame(this.animationRequest);
  }

  private init()
  {
    this.canvas = this.elementView.nativeElement;
    this.renderer = this.canvas.getContext('2d');
    this.ngZone.runOutsideAngular(() => this.animate());
  }

  private animate()
  {
    this.render();
    this.animationRequest = requestAnimationFrame(this.animate.bind(this));
  }

  private check_and_update_renderer()
  {
    const pixelRatio = window.devicePixelRatio || 1;
    const width = this.elementView.nativeElement.clientWidth * pixelRatio | 0;
    const height = this.elementView.nativeElement.clientHeight * pixelRatio | 0;

    const needsUpdate = this.canvas.width !== width || this.canvas.height !== height;
    if (needsUpdate)
    {
      console.log("About to update view...")
      const aspect = width / height;

      this.canvas.width = width;
      this.canvas.height = height;
    }
  }

  private render()
  {
    this.check_and_update_renderer();
    const clock = new Clock(this.renderer, this.canvas.width / 2, this.canvas.height / 2);
    clock.render();
  }

}

