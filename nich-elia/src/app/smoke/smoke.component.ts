import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';


@Component({
  selector: 'app-smoke',
  templateUrl: './smoke.component.html',
  styleUrls: ['./smoke.component.css']
})
export class SmokeComponent implements AfterViewInit
{

  @ViewChild('scene', {read: ElementRef, static:false}) elementView: ElementRef;
  private clock;
  private delta;
  private renderer;
  private scene;
  private camera;
  private geometry;
  private material;
  private mesh;
  private cubeSineDriver;
  private lightColours;
  private lightColourIndex;
  private light;
  private smokeParticles;

  constructor() {}

  ngAfterViewInit()
  {
    this.init();
    this.animate();
    setTimeout(()=>{ setInterval(this.evolveLight.bind(this), 119); }, 1510);
  }

  private init()
  {
    let width = this.elementView.nativeElement.offsetWidth;
    let height = this.elementView.nativeElement.offsetHeight;

    this.clock = new THREE.Clock();

    this.renderer = new THREE.WebGLRenderer({ alpha: false });
    this.renderer.setSize(width, height);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, width/height, 1, 10000);
    this.camera.position.z = 1000;
    this.scene.add(this.camera);

    this.geometry = new THREE.BoxGeometry(200, 200, 200);
    this.material = new THREE.MeshLambertMaterial({ color: 0xaa6666, wireframe: false });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.cubeSineDriver = 0;

    this.lightColours = ['0xff6bb4', '0xff69af', '0xff67a9', '0xff64a4', '0xff629f', '0xff609a', '0xff5e95', '0xff5b8f', '0xff598a', '0xff5785', '0xff5480', '0xff527b', '0xff4f76', '0xff4d71', '0xff4a6c', '0xff4866', '0xff4561', '0xff425c', '0xff4057', '0xff3d52', '0xff3a4d', '0xff3748', '0xff3443', '0xff303e', '0xff2d38', '0xff2933', '0xff252d', '0xff2028', '0xff1b22', '0xff1f1f', '0xff281f', '0xff2f20', '0xff3520', '0xff3b20', '0xff4020', '0xff4520', '0xff4a21', '0xff4e21', '0xff5221', '0xff5622', '0xff5a22', '0xff5e22', '0xff6222', '0xff6523', '0xff6923', '0xff6c23', '0xff6f23', '0xff7224', '0xff7624', '0xff7924', '0xff7c25', '0xff7f25', '0xff8225', '0xff8526', '0xff8826', '0xff8b26', '0xff8e27', '0xff9127', '0xff9528', '0xff9928', '0xff9d28', '0xffa129', '0xffa529', '0xffa92a', '0xffad2a', '0xffb12b', '0xffb52b', '0xffb92c', '0xffbd2c', '0xffc12d', '0xffc52d', '0xffc92e', '0xffcc2f', '0xffd02f', '0xffd430', '0xffd830', '0xffdc31', '0xffe031', '0xffe332', '0xffe732', '0xffeb33', '0xffef33', '0xfff334', '0xfff635', '0xfffa35', '0xfefe36', '0xf9fc35', '0xf1f834', '0xeaf432', '0xe2f031', '0xdbec30', '0xd3e82e', '0xcce42d', '0xc4e02b', '0xbddc2a', '0xb5d829', '0xaed428', '0xa7d026', '0x9fcc25', '0x98c824', '0x90c422', '0x88c021', '0x81bc20', '0x79b81f', '0x71b51d', '0x69b11c', '0x61ad1b', '0x59a91a', '0x50a519', '0x47a117', '0x3d9d16', '0x339915', '0x269514', '0x159113', '0x028e15', '0x09901e', '0x0f9226', '0x14932d', '0x189534', '0x1b973a', '0x1d9940', '0x209a46', '0x229c4c', '0x239e52', '0x259f58', '0x26a15e', '0x27a363', '0x27a469', '0x28a66f', '0x28a874', '0x28aa7a', '0x28ab7f', '0x27ad85', '0x27af8b', '0x26b190', '0x24b296', '0x22b49c', '0x20b6a1', '0x1db8a7', '0x19b9ad', '0x14bbb3', '0x0dbdb8', '0x02bfbe', '0x16babe', '0x23b4bd', '0x2caebb', '0x33a8ba', '0x38a2b9', '0x3d9cb7', '0x4096b6', '0x4391b5', '0x468bb3', '0x4885b2', '0x4a7fb1', '0x4b79af', '0x4c73ae', '0x4d6dac', '0x4e68ab', '0x4e62a9', '0x4e5ca8', '0x4e56a6', '0x4e50a5', '0x4d4aa3', '0x4d43a2', '0x4c3da0', '0x4b369f', '0x4a2f9d', '0x48289c', '0x47209a', '0x451699', '0x430997', '0x440096', '0x470096', '0x4b0095', '0x4e0095', '0x510095', '0x540094', '0x570094', '0x5a0094', '0x5d0093', '0x600093', '0x630093', '0x660092', '0x680092', '0x6b0092', '0x6e0092', '0x700091', '0x730091', '0x750091', '0x780090', '0x7a0090', '0x7c0090', '0x7f008f', '0x81008f', '0x84008f', '0x86008e', '0x88008e', '0x8a008e', '0x8d018d', '0x8f018d'];
    this.lightColourIndex = 0;
    this.light = new THREE.DirectionalLight(this.lightColours[this.lightColourIndex],0.7);
    this.light.position.set(-1,0,1);
    this.scene.add(this.light);

    let smokeTexture = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png');
    let smokeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, map: smokeTexture, transparent: true});
    let smokeGeo = new THREE.PlaneGeometry(300,300);
    this.smokeParticles = [];

    let maxSmoke = 75;
    for (let p = 0; p < maxSmoke; p++)
    {
      let particle = new THREE.Mesh(smokeGeo,smokeMaterial);
      particle.position.set(Math.random()*500-250,Math.random()*500-250,Math.random()*1000-100);
      particle.rotation.z = Math.random() * 360;
      this.scene.add(particle);
      this.smokeParticles.push(particle);
    }

    this.elementView.nativeElement.appendChild(this.renderer.domElement);
  }

  private animate()
  {
    this.delta = this.clock.getDelta();
    requestAnimationFrame(this.animate.bind(this));
    this.evolveSmoke();
    this.render();
  }

  private evolveSmoke()
  {
    var sp = this.smokeParticles.length;
    while(sp--)
    {
      this.smokeParticles[sp].rotation.z += (this.delta * 0.2);
    }
  }

  private evolveLight()
  {
    this.lightColourIndex++;
    if (this.lightColourIndex === this.lightColours.length)
    {
      this.lightColourIndex=0;
    }
    this.light.color.setHex(this.lightColours[this.lightColourIndex]);
  }

  private render()
  {
    this.mesh.rotation.x += 0.005;
    this.mesh.rotation.y += 0.01;
    this.cubeSineDriver += .01;
    this.mesh.position.z = 100 + (Math.sin(this.cubeSineDriver) * 500);
    this.renderer.render(this.scene, this.camera);
  }

}
