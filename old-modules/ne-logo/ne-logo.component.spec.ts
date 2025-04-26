// ne-logo.component.spec.ts
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeLogoComponent } from './ne-logo.component';

describe('NeLogoComponent', () => {
  let component: NeLogoComponent;
  let fixture: ComponentFixture<NeLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
