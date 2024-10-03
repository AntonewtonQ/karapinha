import { Component } from '@angular/core';
import { AboutFormComponent } from '../../components/about-form/about-form.component';
import { HeroAboutusComponent } from '../../components/hero-aboutus/hero-aboutus.component';
import { AboutDetailsComponent } from '../../components/about-details/about-details.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [HeroAboutusComponent,AboutDetailsComponent,AboutFormComponent,HeaderComponent,FooterComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {

}
