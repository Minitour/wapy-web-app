import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductPopupComponent } from './add-product-popup.component';

describe('AddProductPopupComponent', () => {
  let component: AddProductPopupComponent;
  let fixture: ComponentFixture<AddProductPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
