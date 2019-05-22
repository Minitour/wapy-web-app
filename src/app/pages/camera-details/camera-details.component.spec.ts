import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraDetailsComponent } from './camera-details.component';

describe('CameraDetailsComponent', () => {
  let component: CameraDetailsComponent;
  let fixture: ComponentFixture<CameraDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
