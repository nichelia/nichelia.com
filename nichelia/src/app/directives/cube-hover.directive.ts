import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appCubeHover]'
})
export class CubeHoverDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.setupCube();
  }

  private setupCube(): void {
    const cubeContainer = this.renderer.createElement('div');
    const cube = this.renderer.createElement('div');
    const frontFace = this.renderer.createElement('div');
    const backFace = this.renderer.createElement('div');

    this.renderer.addClass(cubeContainer, 'cube-container');
    this.renderer.addClass(cube, 'cube');
    this.renderer.addClass(frontFace, 'cube-face');
    this.renderer.addClass(frontFace, 'front');
    this.renderer.addClass(backFace, 'cube-face');
    this.renderer.addClass(backFace, 'back');

    this.renderer.setProperty(frontFace, 'innerHTML', 'Front');
    this.renderer.setProperty(backFace, 'innerHTML', 'Back');

    this.renderer.appendChild(cube, frontFace);
    this.renderer.appendChild(cube, backFace);
    this.renderer.appendChild(cubeContainer, cube);
    this.renderer.appendChild(this.el.nativeElement, cubeContainer);
  }

  @HostListener('mouseenter') onMouseEnter() {
    const cube = this.el.nativeElement.querySelector('.cube');
    this.renderer.setStyle(cube, 'transform', 'rotateX(-90deg)');
  }

  @HostListener('mouseleave') onMouseLeave() {
    const cube = this.el.nativeElement.querySelector('.cube');
    this.renderer.setStyle(cube, 'transform', 'rotateX(0deg)');
  }
}