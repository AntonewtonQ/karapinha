import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgToastComponent, NgToastModule, NgToastService } from 'ng-angular-popup';
import { User } from '../../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-manage-staff',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './manage-staff.component.html',
  styleUrl: './manage-staff.component.css'
})
export class ManageStaffComponent {

  registerForm : FormGroup;
  isFormSubmited : boolean =false;
  public staffs:User[]=[];

  isEditing: boolean = false;
  editingStaffId: number | null = null;
  imagePreview: string | ArrayBuffer | null = null;

 


  constructor(private userApi:UserService,private auth:AuthService, private router:Router,private toast:NgToastService){
    this.registerForm=new FormGroup({
      name: new FormControl('',Validators.required),
      userName: new FormControl('',[Validators.required]),
      phoneNumber: new FormControl('',[Validators.required,Validators.maxLength(9)]),
      biNumber: new FormControl('',[Validators.required,Validators.maxLength(14),Validators.minLength(14)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required]),
      profile: new FormControl(''),
     
    });
  }

  ngOnInit(): void {
    this.loadStaffs();
  }

  loadStaffs(): void {
    this.userApi.getUser().subscribe(res => {
      this.staffs = res.filter(s=>s.role=='staff');
      console.log(this.staffs);
    });
  }

  loadStaff(id: number): void {
    this.userApi.getUserById(id).subscribe((res: User) => {
      this.isEditing = true;
      this.editingStaffId = id;
      this.registerForm.patchValue({
        name: res.name,
        userName: res.userName,
        phoneNumber: res.phoneNumber,
        biNumber: res.identityNumber,
        email: res.email,
        password: '',  // You might want to handle password differently
        profile: '',
      });
      this.imagePreview = res.photo;
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
      this.registerForm.patchValue({ profile: file });
    }
  }


  onDelete(id:number){
    console.log(id);
    this.userApi.deleteUser(id)
    .subscribe(() =>{
      this.staffs =this.staffs.filter(item => item.id!=id);
      this.toast.info('Administrativo removido','SUCCESS',5000);
    });
  }


 onSubmit() {
    this.isFormSubmited = true;

    if (this.registerForm.valid) {
      console.log('Form Data:', this.registerForm.value);

      const userRequest = {
        id: this.isEditing ? this.editingStaffId : undefined,
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        phoneNumber: this.registerForm.value.phoneNumber,
        photo: this.imagePreview,
        identityNumber: this.registerForm.value.biNumber,
        userName: this.registerForm.value.userName,
        password: this.registerForm.value.password,
        role: "staff",
        status: true,
      };

      if (this.isEditing && this.editingStaffId !== null) {
        // Update user
        this.userApi.updateUser(userRequest).subscribe({
          next: (res) => {
            this.toast.success('Administrativo atualizado', "SUCCESS", 5000);
            this.registerForm.reset();
            this.isEditing = false;
            this.editingStaffId = null;
            this.loadStaffs();
          },
          error: (err) => {
            this.toast.danger((err?.error.message));
          }
        });
      } else {
        // Create new user
        this.auth.signUp(userRequest).subscribe({
          next: (res) => {
            this.toast.success('Administrativo adicionado', "SUCCESS", 5000);
            this.registerForm.reset();
            this.loadStaffs();
          },
          error: (err) => {
            this.toast.danger((err?.error.message));
          }
        });
      }
    }
  }

}
