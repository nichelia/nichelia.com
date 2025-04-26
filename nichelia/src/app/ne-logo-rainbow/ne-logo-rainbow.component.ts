import { Component, AfterViewInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ne-logo-rainbow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ne-logo-rainbow.component.html',
  styleUrls: ['./ne-logo-rainbow.component.css']
})
export class NeLogoRainbowComponent implements AfterViewInit {

  draw: boolean = true;
  smoothTransition: boolean = false;
  fillColour: string = "#fff"
  @Input() animate: string = "rainbow";

  constructor() {}

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
    const R = (x: number, y: number, t: number) =>
    {
      return(Math.floor(192 + 64*Math.cos((x*x-y*y)/300 + t)));
    }
    const G = (x: number, y: number, t: number) =>
    {
      return(Math.floor(192 + 64*Math.sin((x*x*Math.cos(t/4)+y*y*Math.sin(t/3))/300)));
    }
    const B = (x: number, y: number, t: number) =>
    {
      return(Math.floor(192 + 64*Math.sin(5*Math.sin(t/9)+((x-100)*(x-100)+(y-100)*(y-100))/1100)));
    }

    const animateColours = () =>
    {
      changeColour();
    }

    let t = 0;
    const changeColour = () =>
    {
      for(let x=0; x<=35 ;x++)
      {
        for(let y=0; y<=35; y++)
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
    const colours = ['#FF6BB4', '#FF191F', '#FF9027', '#FEFF36', '#008E12', '#00BFBF', '#420096', '#8F018D'];
    let colour = 0;

    const initColours = () =>
    {
      this.fillColour = colours[colour];
      this.draw = false;
    }

    const animateColours = () =>
    {
      this.smoothTransition = true;
      setInterval(changeColour, 3000);
    }
    
    const changeColour = () =>
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
