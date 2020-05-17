import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-hello-cube',
  templateUrl: './hello-cube.component.html',
  styleUrls: ['./hello-cube.component.css']
})
export class HelloCubeComponent implements AfterViewInit
{

  @ViewChild('scene', {read: ElementRef, static:false}) elementView: ElementRef;
  private renderer;
  private scene;
  private camera;
  private geometry;
  private material;
  private mesh;
  private light;
  private cubes;

  constructor() { }

  ngAfterViewInit(): void
  {
    this.init();
    this.animate();
  }

  private init()
  {
    let width = this.elementView.nativeElement.offsetWidth;
    let height = this.elementView.nativeElement.offsetHeight;

    this.renderer = new THREE.WebGLRenderer({ alpha: false });
    this.renderer.setSize(width, height);

    this.scene = new THREE.Scene();

    const fov = 75;
    const aspect = width/height;
    const near = 0.1;
    const far = 5;
    const cameraZ = 2;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.z = cameraZ;

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    this.geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    const lightColour = 0xffffff;
    const lightIntensity = 1;
    const lightX = -1;
    const lightY = 2;
    const lightZ = 4;
    this.light = new THREE.DirectionalLight(lightColour, lightIntensity);
    this.light.position.set(lightX, lightY, lightZ);
    this.scene.add(this.light);

    this.cubes = [
      this.makeInstance(this.geometry, 0x44aa88, 0),
      this.makeInstance(this.geometry, 0x8844aa, -2),
      this.makeInstance(this.geometry, 0xaa8844, 2),
    ];

    this.elementView.nativeElement.appendChild(this.renderer.domElement);
  }

  private makeInstance(geometry, colour, positionX)
  {
    const material = new THREE.MeshPhongMaterial({color: colour});
    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);
    cube.position.x = positionX;
    return cube;
  }

  private animate(time)
  {
    time *= 0.001; // time in seconds
    requestAnimationFrame(this.animate.bind(this));
    this.evolveCubes(time);
    this.render();
  }

  private evolveCubes(time)
  {
    this.cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });
  }

  private render()
  {
    this.renderer.render(this.scene, this.camera);
  }

}
