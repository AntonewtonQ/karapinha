import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroGaleriaComponent } from './hero-galeria.component';

describe('HeroGaleriaComponent', () => {
  let component: HeroGaleriaComponent;
  let fixture: ComponentFixture<HeroGaleriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroGaleriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroGaleriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
