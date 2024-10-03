import { Component, inject } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,LoginComponent,HttpClientModule,FooterComponent,HeaderComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  registerForm : FormGroup;
  isFormSubmited : boolean =false;

 


  constructor(private auth:AuthService, private router:Router,private toast:NgToastService){
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


  onSubmit(){
    const isFormValid=this.registerForm.valid;
    this.isFormSubmited=true;

    if(this.registerForm.valid){

      console.log('Form Data:', this.registerForm.value);
      console.log("Nome dele", this.registerForm.value.name);

      const addUserRequest = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        phoneNumber: this.registerForm.value.phoneNumber,
        photo: this.registerForm.value.profile,
        identityNumber: this.registerForm.value.biNumber,
        userName: this.registerForm.value.userName,
        password: this.registerForm.value.password,
        role: "user",
        status: false
      };


      this.auth.signUp(addUserRequest).subscribe({
        next:(res)=>{
          this.toast.success(res.message,"SUCCESS",5000);
          this.toast.info('Aguarde a ativação da conta',"INFO",5000);
          this.registerForm.reset();
          this.router.navigate(['login']);
        },
        error:(err)=>{
          this.toast.danger(err?.error.message,"ALGO CORREU MAL",5000);
        }
      })
    }else{
      this.toast.warning('Formulário Inválido',"ATENÇÃO",5000);
    }
  }

}
