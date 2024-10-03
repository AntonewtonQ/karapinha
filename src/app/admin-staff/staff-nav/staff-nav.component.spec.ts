import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffNavComponent } from './staff-nav.component';

describe('StaffNavComponent', () => {
  let component: StaffNavComponent;
  let fixture: ComponentFixture<StaffNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StaffNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
