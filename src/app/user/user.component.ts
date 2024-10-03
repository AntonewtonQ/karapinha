import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserNavComponent } from './user-nav/user-nav.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet,UserNavComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
