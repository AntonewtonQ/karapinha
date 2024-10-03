import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProBookingManageComponent } from './pro-booking-manage.component';

describe('ProBookingManageComponent', () => {
  let component: ProBookingManageComponent;
  let fixture: ComponentFixture<ProBookingManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProBookingManageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProBookingManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
