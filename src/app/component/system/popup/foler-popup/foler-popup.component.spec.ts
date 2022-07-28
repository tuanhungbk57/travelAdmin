import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolerPopupComponent } from './foler-popup.component';

describe('FolerPopupComponent', () => {
  let component: FolerPopupComponent;
  let fixture: ComponentFixture<FolerPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolerPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FolerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
