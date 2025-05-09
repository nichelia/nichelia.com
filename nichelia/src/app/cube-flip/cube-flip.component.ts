import { Component, Input } from '@angular/core';

@Component({
  selector: 'cube-flip',
  templateUrl: './cube-flip.component.html',
  styleUrls: ['./cube-flip.component.css']
})
export class CubeFlipComponent {
  @Input() front: string = '';
  @Input() back: string = '';
  isFlipped = false;
}
