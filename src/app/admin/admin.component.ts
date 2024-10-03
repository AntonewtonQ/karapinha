import { Component } from '@angular/core';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AdminNavComponent,RouterOutlet,RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  
}
