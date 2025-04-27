import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMarqueeComponent } from '../ngx-marqueee/ngx-marquee.component';
import { HomeService, MarqueeItem } from './home.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgxMarqueeComponent, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  marqueeItems: MarqueeItem[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.homeService.getMarqueeItems().subscribe(items => {
      this.marqueeItems = items;
    });
  }
}