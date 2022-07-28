import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTourComponent } from './image-tour.component';

describe('ImageTourComponent', () => {
  let component: ImageTourComponent;
  let fixture: ComponentFixture<ImageTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageTourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
