import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Keep CommonModule for *ngIf, *ngFor

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule], // Ensure CommonModule is imported
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
  count: number = 0;
  // Store digits explicitly: [hundreds, tens, ones] or null if not present
  digits: (number | null)[] = [null, null, 0];
  intervalId: any;
  // This MUST match the height set in loader.component.css for .digit-slot and .digit-reel span
  readonly digitHeight = 200; // Example height, adjust in CSS too

  ngOnInit(): void {
    this.updateDigits(); // Initial display

    this.intervalId = setInterval(() => {
      if (this.count < 999) {
        this.count++;
        this.updateDigits();
      } else {
        // Optional: Stop or reset the counter
        // this.clearCounter(); // Stop at 999
         this.count = 0; // Reset to 0
         this.updateDigits();
      }
    // }, 1000); // Interval speed: 1000ms = 1 second
       }, 650); // Adjust interval speed (e.g., 650ms to match transition)
  }

  ngOnDestroy(): void {
    this.clearCounter();
  }

  updateDigits(): void {
    const ones = this.count % 10;
    const tens = this.count >= 10 ? Math.floor(this.count / 10) % 10 : null;
    const hundreds = this.count >= 100 ? Math.floor(this.count / 100) % 10 : null;
    // Update the digits array which drives the *ngIf and transforms in the template
    this.digits = [hundreds, tens, ones];
  }

  // Calculates the Y-transform needed to show the correct digit in a reel
  getTransform(digitValue: number | null): string {
    if (digitValue === null) {
      // Should not happen with correct *ngIf usage, but return default
      return 'translateY(0px)';
    }
    // Calculate the Y offset based on the digit value and the height of each digit element
    // Use NEGATIVE offset to move the reel UP, bringing digits down from the top
    const offset = -(digitValue * this.digitHeight); // Corrected calculation
    return `translateY(${offset}px)`;
  }

  clearCounter(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}