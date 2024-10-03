import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroAboutusComponent } from './hero-aboutus.component';

describe('HeroAboutusComponent', () => {
  let component: HeroAboutusComponent;
  let fixture: ComponentFixture<HeroAboutusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroAboutusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroAboutusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
