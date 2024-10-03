import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../../services/user.service';
import { User } from '../../../models/user.model';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  registerForm : FormGroup;
  public user!:User;
  selectedUserId!:number;

  constructor(
    private userApi:UserService,
    private toast:NgToastService
  ){
    this.registerForm=new FormGroup({
      name: new FormControl('',Validators.required),
      userName: new FormControl('',[Validators.required]),
      phoneNumber: new FormControl('',[Validators.required,Validators.maxLength(9)]),
      biNumber: new FormControl('',[Validators.required,Validators.maxLength(14),Validators.minLength(14)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required]),
      confirmPassword: new FormControl('',[Validators.required]),
      profile: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.getUserById();
  }

  getUserIdFromToken(): number | null {
    const token = localStorage.getItem('token'); 
    if (token) {
      const decoded: any = jwtDecode(token);
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

  onUpdate() {
    if (this.registerForm.valid && this.selectedUserId) {
      const updatedUser = {
        id: this.selectedUserId,
        ...this.registerForm.value
      };

      this.userApi.updateUser(updatedUser).subscribe(() => {
        this.toast.success('Usuário atualizado com sucesso', 'SUCCESS', 5000);
        this.registerForm.reset();
        this.selectedUserId = 0; 
      });
    }
  }

  onEdit(user: User): void {
    this.selectedUserId = user.id;
    this.registerForm.patchValue({
      name: user.name,
      userName: user.userName,
      phoneNumber: user.phoneNumber,
      biNumber: user.identityNumber,
      email: user.email,
      password: user.password,
      confirmPassword: user.password,
      profile: user.photo
    });
  }

}