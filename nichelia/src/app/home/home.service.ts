import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MarqueeItem {
  name: string;
  url: string;
  class?: string;
}

@Injectable({ providedIn: 'root' })
export class HomeService {
  constructor(private http: HttpClient) {}

  getMarqueeItems(): Observable<MarqueeItem[]> {
    return this.http.get<MarqueeItem[]>('/assets/data/home.data.json');
  }
}
