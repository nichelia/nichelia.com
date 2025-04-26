import { Component, AfterViewInit, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Renderer2 } from '@angular/core';
import { NeLogoComponent, ShaderParams } from './ne-logo/ne-logo.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, CommonModule, NeLogoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nichelia';
  version = "v0.0.0";
  imageData!: ImageData;
  shaderParams: ShaderParams = {
    patternScale: 10,
    refraction: 0.06,
    edge: 0.19,
    patternBlur: 0,
    liquid: 0.07,
    speed: 0.3,
  };

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {
    this.loadImage();
  }

  private loadImage() {
    if (!this.document) {
      console.warn('Document is not available. Skipping image loading.');
      return;
    }

    const canvas = this.renderer.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) {
      console.warn('Canvas context is not available.');
      return;
    }

    const img = this.renderer.createElement('img');
    img.src = '/assets/logo/logo.svg';
    console.log('Setting image source to:', img.src);

    img.onload = () => {
      console.log('Image loaded successfully:', img.width, img.height);
      if (img.width === 0 || img.height === 0) {
        console.error('Image has zero dimensions.');
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      console.log('Canvas dimensions set to:', canvas.width, canvas.height);

      context.drawImage(img, 0, 0);
      console.log('Image drawn directly onto the canvas.');

      // Assign the extracted image data to this.imageData
      this.imageData = context.getImageData(0, 0, img.width, img.height);
      console.log('ImageData generated:', this.imageData);
    };

    img.onerror = (error: Event) => {
      console.error('Failed to load image:', error);
    };
  }
}
