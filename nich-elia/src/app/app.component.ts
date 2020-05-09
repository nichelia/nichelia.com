import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit
{
  logo: boolean = true;
  minimiseLogo: boolean = false;

  constructor() {}

  ngAfterViewInit(): void
  {
    setTimeout(()=>{this.minimiseLogo=true;}, 3000);
  }

  logoClasses()
  {
    let classes = {
      "logo": this.logo,
      "logo-minimise": this.minimiseLogo,
    };
    return classes;
  }

}
