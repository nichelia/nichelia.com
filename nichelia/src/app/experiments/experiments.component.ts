import { Component, OnInit } from '@angular/core';
import { EXPERIMENTS } from './experiments';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.css']
})
export class ExperimentsComponent implements OnInit
{

  experiments = EXPERIMENTS;

  constructor() { }

  ngOnInit(): void { }

}