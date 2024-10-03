import { Component } from '@angular/core';
import { HeroGaleriaComponent } from '../../components/hero-galeria/hero-galeria.component';
import { GaleriaDetailsComponent } from '../../components/galeria-details/galeria-details.component';
import { HomeComponent } from '../home/home.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [HeroGaleriaComponent,GaleriaDetailsComponent,HeaderComponent,FooterComponent],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css'
})
export class GaleriaComponent {

}
