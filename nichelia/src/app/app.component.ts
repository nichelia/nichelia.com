import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  imports: [CommonModule, LoaderComponent, HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('bottomSlide', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate('1200ms cubic-bezier(0.2, 1, 0.3, 1)', style({
          opacity: 1,
          transform: 'translateY(100vh)'
        }))
      ])
    ])
  ]
})
export class AppComponent implements AfterViewInit {
  isLoading = true; // Controls loader visibility
  progress = 0; // Loader progress percentage
  private startTime = Date.now(); // Track when loading started
  private angularReady = false; // Flag for Angular readiness
  private progressInterval: any; // Interval for progress simulation

  constructor() {
    this.simulateProgress(); // Start simulating progress
  }

  // Simulate progress with easing and random increments
  simulateProgress() {
    this.progressInterval = setInterval(() => {
      if (this.progress < 95) {
        const max = 95;
        const t = this.progress / max;
        // Larger random increment for bigger jumps, slows as it nears max
        const increment = Math.max(1, Math.round((1 - Math.pow(t, 3)) * (15 + Math.random() * 15)));
        this.progress += increment;
        if (this.progress > max) this.progress = max;
      }
    }, 1000);
  }

  // Called when Angular view is initialized
  ngAfterViewInit() {
    this.angularReady = true;
    const elapsed = Date.now() - this.startTime;
    if (elapsed < 1000) {
      // If Angular is ready before 1s, wait until 3s total
      setTimeout(() => this.finishLoading(), 3000 - elapsed);
    } else {
      // If Angular is ready after 1s, finish immediately
      this.finishLoading();
    }
  }

  // Complete loading: set progress to 100 and hide loader after short delay
  finishLoading() {
    clearInterval(this.progressInterval);
    this.progress = 100;
    setTimeout(() => {
      this.isLoading = false;
    }, 700); // Allow animation to reach 100%
  }
}
