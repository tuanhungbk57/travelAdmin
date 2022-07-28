import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationMasterComponent } from './destination-master.component';

describe('DestinationMasterComponent', () => {
  let component: DestinationMasterComponent;
  let fixture: ComponentFixture<DestinationMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinationMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
