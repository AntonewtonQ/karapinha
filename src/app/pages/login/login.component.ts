import { Component, Injectable } from '@angular/core';
import { SignupComponent } from '../signup/signup.component';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,SignupComponent,RouterLink,FooterComponent,HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  

  username: string = '';
  password: string = '';

  loginForm : FormGroup;
  isFormSubmited : boolean =false;
  entrou:boolean=false;


  constructor(private auth:AuthService, private route:Router, private toast:NgToastService ) { 
    this.loginForm=new FormGroup({
      userName: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required]),
      
    });
  }

 

  onSubmit(){
    if(this.loginForm.valid){
      //send somethig to database

      

      this.auth.login(this.loginForm.value).subscribe({
        next:(res)=>{
          //console.log(res.token);
          this.auth.storeToken(res.token);
          this.toast.success(res.message,"SUCCESS",5000);

          if(res.role==='user'){
              this.route.navigate(['user']);
          }
          if(res.role==='staff'){
            this.route.navigate(['staff']);  
          }
          if(res.role==='admin'){
            this.route.navigate(['admin']);
          }
          
        },
        error:(err)=>{
          this.entrou=true;
          
        }
      })

      const proRequest={
        profissionalName: this.loginForm.value.userName,
        password: this.loginForm.value.password,
      }

      console.log(this.loginForm.value);

      this.auth.loginPro(proRequest).subscribe({
        next:(res)=>{
          this.auth.storeToken(res.token);
        this.toast.success(res.message,"SUCCESS",5000);
          console.log(res);
        if(res.user.role==='pro'){
          this.route.navigate(['pro']);
        }
        },error:(err)=>{
          this.toast.info("A sua conta ainda não foi ativada","INFO",5000);
          this.entrou=true;
        }
      })

      if(this.entrou){
        this.toast.danger("UserName ou password incorreta", "Erro", 5000);
      }
      
    }else{
      this.toast.danger('Erro');
    }
 
  }

}


