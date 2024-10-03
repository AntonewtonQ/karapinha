import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ManageStaffComponent } from '../manage-staff/manage-staff.component';
import { ManageUserComponent } from '../manage-user/manage-user.component';

@Component({
  selector: 'app-admin-nav',
  standalone: true,
  imports: [RouterLink,ManageStaffComponent,ManageUserComponent],
  templateUrl: './admin-nav.component.html',
  styleUrl: './admin-nav.component.css'
})
export class AdminNavComponent {
  constructor(private auth:AuthService){}

  logout(){
    this.auth.signOut();
  }
}
