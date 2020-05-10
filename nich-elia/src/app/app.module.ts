import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NeLogoComponent } from './ne-logo/ne-logo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SmokeComponent } from './smoke/smoke.component';

@NgModule({
  declarations: [
    AppComponent,
    NeLogoComponent,
    SmokeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
