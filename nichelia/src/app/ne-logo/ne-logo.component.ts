import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  NgZone,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

// Custom debounce implementation
function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function (this: any, ...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export interface ShaderParams {
  patternScale: number;
  refraction: number;
  edge: number;
  patternBlur: number;
  liquid: number;
  speed: number;
}

@Component({
  selector: 'app-ne-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ne-logo.component.html',
  styleUrls: ['./ne-logo.component.css']
})
export class NeLogoComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() imageData!: ImageData;
  @Input() params!: ShaderParams;

  private gl!: WebGL2RenderingContext;
  private program!: WebGLProgram;
  private uniforms: Record<string, WebGLUniformLocation> = {};
  private vertexShaderSource = `#version 300 es
precision mediump float;
in vec2 a_position;
out vec2 vUv;
void main() {
  vUv = 0.5 * (a_position + 1.0); // Map from [-1, 1] to [0, 1]
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

  private fragmentShaderSource = `#version 300 es
precision mediump float;
in vec2 vUv;
out vec4 fragColor;
uniform sampler2D u_image_texture;

void main() {
  fragColor = texture(u_image_texture, vUv); // Sample the texture to display the image
}`;

  private totalTime = 0;
  private lastTime = 0;
  private rafId = 0;
  private resizeListener!: () => void;
  private debouncedResize!: () => void;

  constructor(private el: ElementRef<HTMLCanvasElement>, private ngZone: NgZone) {
    this.debouncedResize = debounce(() => this.resize(), 100);
  }

  ngAfterViewInit() {
    if (typeof window === 'undefined') {
      console.warn('Window is not defined. Skipping WebGL initialization.');
      return;
    }

    const canvas = this.el.nativeElement.querySelector('canvas');
    if (!(canvas instanceof HTMLCanvasElement)) {
      console.error('No valid canvas element found in the template.');
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      try {
        this.initGL(canvas);
        this.startRenderLoop();
        this.resizeListener = () => this.resize();
        window.addEventListener('resize', this.resizeListener);
      } catch (error) {
        console.error('WebGL initialization failed:', error);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['imageData'] && this.imageData) {
      console.log('Received new imageData:', this.imageData.width, this.imageData.height);
      if (!this.gl) {
        const canvas = this.el.nativeElement.querySelector('canvas');
        if (canvas instanceof HTMLCanvasElement) {
          this.ngZone.runOutsideAngular(() => {
            try {
              this.initGL(canvas);
              this.startRenderLoop();
              this.resize();
              this.resizeListener = () => this.debouncedResize();
              window.addEventListener('resize', this.resizeListener);
            } catch (error) {
              console.error('WebGL initialization failed:', error);
            }
          });
        } else {
          console.error('No valid canvas element found in the template.');
        }
      } else {
        this.uploadTexture();
        this.resize();
      }
    } else if (changes['imageData'] && !this.imageData) {
      console.warn('imageData is undefined. Skipping WebGL initialization.');
    }

    if (changes['params'] && this.gl) {
      console.log('Shader parameters updated:', this.params);
      this.updateUniforms();
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.resizeListener);
    }
    if (typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(this.rafId);
    }
    if (this.gl && this.program) {
      this.gl.deleteProgram(this.program);
    }
  }

  private initGL(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl2', { alpha: true, antialias: true });
    if (!gl) {
      throw new Error('WebGL2 not supported.');
    }
    this.gl = gl;
    console.log('WebGL context initialized.');

    const createShader = (src: string, type: number) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        throw new Error('Shader compile failed');
      }
      return s;
    };

    const vs = createShader(this.vertexShaderSource, gl.VERTEX_SHADER);
    const fs = createShader(this.fragmentShaderSource, gl.FRAGMENT_SHADER);
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      throw new Error('Program link failed');
    }
    gl.useProgram(program);
    this.program = program;
    console.log('Shader program linked and used.');

    // get all uniforms
    const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < count; i++) {
      const info = gl.getActiveUniform(program, i);
      if (info) {
        this.uniforms[info.name] = gl.getUniformLocation(program, info.name)!;
        console.log(`Uniform ${info.name} location set.`);
      }
    }

    // setup quad
    const verts = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
    console.log('Quad setup complete.');

    // initial uniforms & texture
    this.updateUniforms();
    this.uploadTexture();
    console.log('Uniforms and texture initialized.');
  }

  private updateUniforms() {
    const { edge, patternBlur, patternScale, refraction, liquid } = this.params;
    const { u_edge, u_patternBlur, u_patternScale, u_refraction, u_liquid } = this.uniforms;

    this.gl.uniform1f(u_edge, edge);
    this.gl.uniform1f(u_patternBlur, patternBlur);
    this.gl.uniform1f(u_patternScale, patternScale);
    this.gl.uniform1f(u_refraction, refraction);
    this.gl.uniform1f(u_liquid, liquid);

    console.log('Updated shader uniforms:', {
      edge,
      patternBlur,
      patternScale,
      refraction,
      liquid,
    });
  }

  private uploadTexture() {
    if (!this.imageData) {
      console.warn('Image data is not available. Skipping texture upload.');
      return;
    }

    console.log('Uploading texture with dimensions:', this.imageData.width, this.imageData.height);

    const gl = this.gl;
    const tex = gl.createTexture()!;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);

    // Flip the texture vertically
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      this.imageData.width,
      this.imageData.height,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      this.imageData.data
    );
    gl.uniform1i(this.uniforms['u_image_texture'], 0);
    console.log('Texture uploaded and bound to u_image_texture.');
  }

  private startRenderLoop() {
    this.lastTime = performance.now();
    const loop = (now: number) => {
      const dt = now - this.lastTime;
      this.lastTime = now;
      this.totalTime += dt * this.params.speed;
      this.gl.uniform1f(this.uniforms['u_time'], this.totalTime);

      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);

      // Check for WebGL errors
      const error = this.gl.getError();
      if (error !== this.gl.NO_ERROR) {
        console.error('WebGL error:', error);
      }

      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  private resize() {
    if (typeof window === 'undefined') {
      console.warn('Window is not defined. Skipping resize operation.');
      return;
    }

    if (!this.imageData) {
      console.warn('Image data is not available. Skipping resize operation.');
      return;
    }

    const canvas = this.el.nativeElement;
    const gl = this.gl;

    // Use image dimensions for canvas size
    // canvas.width = this.imageData.width;
    // canvas.height = this.imageData.height;
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Adjust for image aspect ratio
    const imgRatio = this.imageData.width / this.imageData.height;
    console.log(this.imageData.width, this.imageData.height);
    gl.uniform1f(this.uniforms['u_img_ratio'], imgRatio);
    const side = 1000;
    canvas.width = side * devicePixelRatio;
    canvas.height = side * devicePixelRatio;
    gl.viewport(0, 0, canvas.height, canvas.height);
    gl.uniform1f(this.uniforms["u_ratio"], 1);
    gl.uniform1f(this.uniforms["u_img_ratio"], imgRatio);

  }
}