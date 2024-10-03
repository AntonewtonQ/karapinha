import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StaffNavComponent } from './staff-nav/staff-nav.component';

@Component({
  selector: 'app-admin-staff',
  standalone: true,
  imports: [RouterOutlet,StaffNavComponent],
  templateUrl: './admin-staff.component.html',
  styleUrl: './admin-staff.component.css'
})
export class AdminStaffComponent {

}
