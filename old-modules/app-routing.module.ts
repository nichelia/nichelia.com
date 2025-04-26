import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ExperimentsComponent } from './experiments/experiments.component';
import { HelloCubeComponent } from './hello-cube/hello-cube.component';
import { PrimitivesComponent } from './primitives/primitives.component';
import { CanvasClockComponent } from './canvas-clock/canvas-clock.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'experiments', component: ExperimentsComponent },
  { path: 'experiments/hello-cube', component: HelloCubeComponent },
  { path: 'experiments/primitives', component: PrimitivesComponent },
  { path: 'experiments/canvas-clock', component: CanvasClockComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
