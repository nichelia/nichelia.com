import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ExperimentsComponent } from './experiments/experiments.component';
import { HelloCubeComponent } from './hello-cube/hello-cube.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'experiments', component: ExperimentsComponent },
  { path: 'experiments/hello-cube', component: HelloCubeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
