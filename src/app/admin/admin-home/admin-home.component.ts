import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {

  public users:User[] =[]

  constructor(private api:UserService,private auth:AuthService){}

  ngOnInit(): void {
    this.api.getUser().subscribe(res =>{
      console.log(res);
      this.users = res;
    });
  }
}
