import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTripComponent } from './image-trip.component';

describe('ImageTripComponent', () => {
  let component: ImageTripComponent;
  let fixture: ComponentFixture<ImageTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageTripComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
