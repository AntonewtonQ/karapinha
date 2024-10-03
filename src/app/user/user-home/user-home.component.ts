import { Component } from '@angular/core';
import { BookingSectionComponent } from '../booking-section/booking-section.component';
import { UserFooterComponent } from '../user-footer/user-footer.component';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [BookingSectionComponent,UserFooterComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent {

}
