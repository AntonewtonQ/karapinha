import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BookingComponent } from '../booking/booking.component';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-nav',
  standalone: true,
  imports: [RouterLink,BookingComponent],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.css'
})
export class UserNavComponent {
  public user!:User;

  constructor(private auth:AuthService,private userApi:UserService){}

  ngOnInit(): void {
    this.getUserById();
  }

  logout(){
    this.auth.signOut();
  }

  getUserIdFromToken(): number | null {
    const token = localStorage.getItem('token'); // Supondo que o token está armazenado no localStorage com a chave 'token'
    console.log(token);
    if (token) {
      const decoded: any = jwtDecode(token);
      console.log(decoded);
      return decoded.nameid; // Ajuste o campo conforme necessário
    }
    return null;
  }

  getUserById(){
    const userId=this.getUserIdFromToken();
    if(userId){
      this.userApi.getUserById(userId).subscribe(res=>{
        this.user=res;
      })
    }
  }
}
