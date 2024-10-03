import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../../services/user.service';
import { Profissional } from '../../../models/profissional.model';
import { ProfissionalSchedule } from '../../../models/profissionalSchedule.model';
import { ProfissionalService } from '../../services/profissional.service';

@Component({
  selector: 'app-pro-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pro-nav.component.html',
  styleUrl: './pro-nav.component.css'
})
export class ProNavComponent {
  public user!:Profissional;

  constructor(private auth:AuthService,private userApi:UserService,private profissionalApi:ProfissionalService){}

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
      this.profissionalApi.getProfissionalById(userId).subscribe(res=>{
        this.user=res;
      })
    }
  }
}
