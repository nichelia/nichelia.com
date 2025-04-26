import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMarqueeComponent } from '../ngx-marqueee/ngx-marquee.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgxMarqueeComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}