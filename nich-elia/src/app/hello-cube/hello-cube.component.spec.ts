import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloCubeComponent } from './hello-cube.component';

describe('HelloCubeComponent', () => {
  let component: HelloCubeComponent;
  let fixture: ComponentFixture<HelloCubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelloCubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloCubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
