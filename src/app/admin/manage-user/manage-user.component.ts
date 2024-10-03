import { Component } from '@angular/core';
import { User } from '../../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.css'
})
export class ManageUserComponent {
  public users:User[]=[];
  toogle:boolean=false;

  constructor(private auth:AuthService,private userApi:UserService, private router:Router,private toast:NgToastService){}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userApi.getUser().subscribe(res => {
      this.users = res.filter(u=>u.role=='user');
      console.log(this.users);
    });
  }

  ativarUsuario(userId: number) {
    this.auth.activateUser(userId).subscribe({
      next: (res: any) => {
        if(res.status===true){
          this.toast.info('Essa conta já foi ativada', "info", 5000);  
          //this.loadUsers();
        }else{
          this.toast.success(res.message, "Ativada", 5000);
          this.loadUsers();
        }
        
      },
      error: (err) => {
        this.toast.danger(err?.error.message, "Erro ao ativar usuário", 5000);
      }
    });
  }

  desativateUsuario(userId: number) {
    this.auth.desativateUser(userId).subscribe({
      next: (res: any) => {
        if(res.status===false){
          this.toast.info('Essa conta já foi desativada', "info", 5000);  
        }else{
          this.toast.warning(res.message, "Desativada", 5000);
          this.loadUsers();
        }
      },
      error: (err) => {
        this.toast.danger(err?.error.message, "Erro ao ativar usuário", 5000);
      }
    });
  }

  toogleFunc(userId:number){
    if (!this.toogle) {
      this.toogle=true;
      this.ativarUsuario(userId);
    }else{
      this.toogle=false;
      this.desativateUsuario(userId);
    }
  }
}



