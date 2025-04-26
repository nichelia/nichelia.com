import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
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
  displayedCount: number = 0;
  digits: (number | null)[] = [null, null, 0];
  nextDigits: (number | null)[] = [null, null, 0];
  animating: boolean[] = [false, false, false];
  readonly digitHeight = 200; // Example height, adjust in CSS too

  prev_digit_one: number | null = null;
  prev_digit_two: number | null = null;
  prev_digit_three: number | null = null;
  animating_one = false;
  animating_two = false;
  animating_three = false;

  displayed_digit_one: number | null = null;
  displayed_digit_two: number | null = null;
  displayed_digit_three: number | null = null;

  // Dummy input values for testing
  testValues: number[] = [0, 5, 8, 10, 22, 11, 14, 20, 10, 25, 28, 88, 99, 150, 200, 500, 999];
  testIndex: number = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.setCount(this.testValues[this.testIndex]);
    this.displayed_digit_one = this.digit_one;
    this.displayed_digit_two = this.digit_two;
    this.displayed_digit_three = this.digit_three;
  }

  ngOnDestroy(): void {
    // No interval to clear
  }

  setCount(newValue: number): void {
    this.count = Math.max(0, Math.min(999, newValue));
    this.animateDigits();
  }

  nextTestValue(): void {
    this.testIndex = (this.testIndex + 1) % this.testValues.length;
    this.setCount(this.testValues[this.testIndex]);
  }

  animateDigits(): void {
    const new_one = this.digit_one;
    const new_two = this.digit_two;
    const new_three = this.digit_three;

    // Animate hundreds (null <-> number)
    if (new_one !== this.prev_digit_one) {
      this.displayed_digit_one = new_one;
      this.animating_one = true;
      this.cdr.detectChanges();
      setTimeout(() => {
        this.prev_digit_one = new_one;
        this.displayed_digit_one = new_one;
        this.animating_one = false;
        this.cdr.detectChanges();
      }, 500);
    }
    // Animate tens (null <-> number)
    if (new_two !== this.prev_digit_two) {
      this.displayed_digit_two = new_two;
      this.animating_two = true;
      this.cdr.detectChanges();
      setTimeout(() => {
        this.prev_digit_two = new_two;
        this.displayed_digit_two = new_two;
        this.animating_two = false;
        this.cdr.detectChanges();
      }, 500);
    }
    // Animate ones
    if (new_three !== this.prev_digit_three) {
      this.displayed_digit_three = new_three;
      this.animating_three = true;
      this.cdr.detectChanges();
      setTimeout(() => {
        this.prev_digit_three = new_three;
        this.displayed_digit_three = new_three;
        this.animating_three = false;
        this.cdr.detectChanges();
      }, 500);
    }
    // Remove all first-render special cases
    this.cdr.detectChanges();
  }

  getTransform(i: number): string {
    // If animating, slide to 0 (new digit slides down)
    if (this.animating[i] && this.nextDigits[i] !== null) {
      return `translateY(0px)`;
    }
    // If next digit is set but not animating, start above
    if (this.nextDigits[i] !== null) {
      return `translateY(-${this.digitHeight}px)`;
    }
    // Default: show current digit
    return 'translateY(0px)';
  }

  get digit_one(): number | null {
    // Leftmost: most significant digit
    if (this.count >= 100) {
      return Math.floor(this.count / 100);
    } else if (this.count >= 10) {
      return Math.floor(this.count / 10);
    } else {
      return this.count;
    }
  }
  get digit_two(): number | null {
    // Middle: next most significant digit, or empty
    if (this.count >= 100) {
      return Math.floor((this.count % 100) / 10);
    } else if (this.count >= 10) {
      return this.count % 10;
    } else {
      return null;
    }
  }
  get digit_three(): number | null {
    // Rightmost: least significant digit, or empty
    if (this.count >= 100) {
      return this.count % 10;
    } else {
      return null;
    }
  }

  clearCounter(): void {
    // No interval to clear
  }
}