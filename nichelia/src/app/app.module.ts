import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NeLogoComponent } from './ne-logo/ne-logo.component';
import { SmokeComponent } from './smoke/smoke.component';
import { ExperimentsComponent } from './experiments/experiments.component';
import { HelloCubeComponent } from './hello-cube/hello-cube.component';
import { PrimitivesComponent } from './primitives/primitives.component';
import { CanvasClockComponent } from './canvas-clock/canvas-clock.component';

@NgModule({
  declarations: [
    AppComponent,
    NeLogoComponent,
    SmokeComponent,
    HomeComponent,
    ExperimentsComponent,
    HelloCubeComponent,
    PrimitivesComponent,
    CanvasClockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
