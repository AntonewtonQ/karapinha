import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProfissinalComponent } from './manage-profissinal.component';

describe('ManageProfissinalComponent', () => {
  let component: ManageProfissinalComponent;
  let fixture: ComponentFixture<ManageProfissinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageProfissinalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageProfissinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
