// ne-logo.component.ts
import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-ne-logo',
  templateUrl: './ne-logo.component.svg',
  styleUrls: ['./ne-logo.component.css'],
})
export class NeLogoComponent implements OnInit, AfterViewInit
{

  draw: boolean = true;
  smoothTransition: boolean = false;
  fillColour: string = "#000"
  @Input() animate: string = "";

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void
  {
    if (this.animate === "rainbow")
    {
      this.rainbowColours();
    }
    else if (this.animate === "random")
    {
      this.randomColours();
    }
  }

  private randomColours()
  {
    var R = (x, y, t) =>
    {
      return(Math.floor(192 + 64*Math.cos((x*x-y*y)/300 + t)));
    }
    var G = (x, y, t) =>
    {
      return(Math.floor(192 + 64*Math.sin((x*x*Math.cos(t/4)+y*y*Math.sin(t/3))/300)));
    }
    var B = (x, y, t) =>
    {
      return(Math.floor(192 + 64*Math.sin(5*Math.sin(t/9)+((x-100)*(x-100)+(y-100)*(y-100))/1100)));
    }

    var animateColours = () =>
    {
      changeColour();
    }

    var t = 0;
    var changeColour = () =>
    {
      for(var x=0; x<=35 ;x++)
      {
        for(var y=0; y<=35; y++)
        {
          let rgbColour = 'rgb('+R(x,y,t)+','+G(x,y,t)+','+B(x,y,t)+')';
          this.fillColour = rgbColour;
        }
      }
      t = t + 0.005;
      window.requestAnimationFrame(changeColour);
    }

    setTimeout(animateColours, 1500);
  }

  private rainbowColours()
  {
    var colours = ['#FF6BB4', '#FF191F', '#FF9027', '#FEFF36', '#008E12', '#00BFBF', '#420096', '#8F018D'];
    var colour = 0;

    var initColours = () =>
    {
      this.fillColour = colours[colour];
      this.draw = false;
    }

    var animateColours = () =>
    {
      this.smoothTransition = true;
      setInterval(changeColour, 3000);
    }
    
    var changeColour = () =>
    {
      colour++;
      if (colour === colours.length)
      {
        colour=0;
      }
      this.fillColour = colours[colour];
    }

    setTimeout(initColours, 1500);
    setTimeout(animateColours, 1510); 
  }

  setElementStyles()
  {
    let styles = {
      'fill': this.fillColour
    };
    return styles
  }

  setElementClasses()
  {
    let classes = {
      "draw": this.draw,
      "smooth-transition": this.smoothTransition
    };
    return classes;
  }

}
