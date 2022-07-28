import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageGeneralComponent } from './image-general.component';

describe('ImageGeneralComponent', () => {
  let component: ImageGeneralComponent;
  let fixture: ComponentFixture<ImageGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
