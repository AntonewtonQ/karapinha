import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-staff-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './staff-nav.component.html',
  styleUrl: './staff-nav.component.css'
})
export class StaffNavComponent {
  constructor(private auth:AuthService){}


  logout(){
    this.auth.signOut();
  }
}
