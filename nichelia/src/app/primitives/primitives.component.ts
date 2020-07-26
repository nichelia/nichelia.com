import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-primitives',
  templateUrl: './primitives.component.html',
  styleUrls: ['./primitives.component.css']
})
export class PrimitivesComponent implements AfterViewInit
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
    requestAnimationFrame(this.animate.bind(this));
  }

  private init()
  {
    const canvas = this.elementView.nativeElement;
    this.renderer = new THREE.WebGLRenderer({canvas});
    this.scene = new THREE.Scene();

    const fov = 75;
    const aspect = 2;
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

  private check_and_update_renderer_and_camera()
  {
    const pixelRatio = window.devicePixelRatio;
    const width = this.elementView.nativeElement.clientWidth * pixelRatio | 0;
    const height = this.elementView.nativeElement.clientHeight * pixelRatio | 0;

    const needsUpdate = this.renderer.domElement.width !== width || this.renderer.domElement.height !== height;
    if (needsUpdate)
    {
      console.log("About to update view...")
      const aspect = width/height;
      this.camera.aspect = aspect;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(width, height, false);
    }
  }

  private render()
  {
    this.check_and_update_renderer_and_camera();
    this.renderer.render(this.scene, this.camera);
  }

}
