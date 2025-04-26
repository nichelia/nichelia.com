import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Keep CommonModule for *ngIf, *ngFor
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule], // Ensure CommonModule is imported
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  animations: [
    trigger('slideFade', [
      transition(':leave', [
        animate('700ms ease', style({
          opacity: 0,
          transform: 'translateY(100px)'
        }))
      ])
    ])
  ]
})
export class LoaderComponent implements OnInit {
  @Input() progress: number = 0;
  count: number = 0;
  // Animation state and digit values
  prev_digit_one: number | null = null; // Previous value for leftmost digit
  prev_digit_two: number | null = null; // Previous value for middle digit
  prev_digit_three: number | null = null; // Previous value for rightmost digit
  animating_one = false; // Animation state for leftmost digit
  animating_two = false; // Animation state for middle digit
  animating_three = false; // Animation state for rightmost digit
  displayed_digit_one: number | null = null; // Currently displayed value for leftmost digit
  displayed_digit_two: number | null = null; // Currently displayed value for middle digit
  displayed_digit_three: number | null = null; // Currently displayed value for rightmost digit

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.setCount(this.progress);
    this.displayed_digit_one = this.digit_one;
    this.displayed_digit_two = this.digit_two;
    this.displayed_digit_three = this.digit_three;
  }

  ngOnChanges(): void {
    this.setCount(this.progress);
  }

  // Set the count and trigger animation
  setCount(newValue: number): void {
    this.count = Math.max(0, Math.min(999, Math.round(newValue)));
    this.animateDigits();
  }

  /**
   * Animate digits with a cascading effect.
   * Each digit animates with a slight delay for a smooth cascade.
   */
  animateDigits(): void {
    const digits = [this.digit_one, this.digit_two, this.digit_three];
    const prev_digits = [this.prev_digit_one, this.prev_digit_two, this.prev_digit_three];
    const set_displayed = [
      (v: number | null) => (this.displayed_digit_one = v),
      (v: number | null) => (this.displayed_digit_two = v),
      (v: number | null) => (this.displayed_digit_three = v)
    ];
    const set_prev = [
      (v: number | null) => (this.prev_digit_one = v),
      (v: number | null) => (this.prev_digit_two = v),
      (v: number | null) => (this.prev_digit_three = v)
    ];
    const animating = [
      (v: boolean) => (this.animating_one = v),
      (v: boolean) => (this.animating_two = v),
      (v: boolean) => (this.animating_three = v)
    ];
    // Animate each digit with a delay (0ms, 100ms, 200ms)
    [0, 1, 2].forEach(i => {
      if (digits[i] !== prev_digits[i]) {
        setTimeout(() => {
          set_displayed[i](digits[i]);
          animating[i](true);
          this.cdr.detectChanges();
          setTimeout(() => {
            set_prev[i](digits[i]);
            set_displayed[i](digits[i]);
            animating[i](false);
            this.cdr.detectChanges();
          }, 500);
        }, i * 100);
      }
    });
    this.cdr.detectChanges();
  }

  /**
   * Get the leftmost digit (most significant digit).
   * For 1-9: returns ones, for 10-99: returns tens, for 100-999: returns hundreds.
   */
  get digit_one(): number | null {
    if (this.count >= 100) {
      return Math.floor(this.count / 100);
    } else if (this.count >= 10) {
      return Math.floor(this.count / 10);
    } else {
      return this.count;
    }
  }
  /**
   * Get the middle digit (next most significant digit).
   * For 10-99: returns ones, for 100-999: returns tens, else null.
   */
  get digit_two(): number | null {
    if (this.count >= 100) {
      return Math.floor((this.count % 100) / 10);
    } else if (this.count >= 10) {
      return this.count % 10;
    } else {
      return null;
    }
  }
  /**
   * Get the rightmost digit (least significant digit).
   * For 100-999: returns ones, else null.
   */
  get digit_three(): number | null {
    if (this.count >= 100) {
      return this.count % 10;
    } else {
      return null;
    }
  }
}