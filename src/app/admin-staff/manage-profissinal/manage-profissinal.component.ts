import { Component } from '@angular/core';
import { Profissional } from '../../../models/profissional.model';
import { ProfissionalService } from '../../services/profissional.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../../models/category.model';
import { Schedule } from '../../../models/schedule.model';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-manage-profissinal',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule,RouterLink],
  templateUrl: './manage-profissinal.component.html',
  styleUrl: './manage-profissinal.component.css'
})
export class ManageProfissinalComponent {
  public profissionals:Profissional[]=[];
  public categories:Category[]=[];
  public schedules:Schedule[]=[];
  public selectedProfissionalId: number | null = null;
  public category?:Category;
  
  registerProfissionlForm!:FormGroup;
  editProfissionalForm!: FormGroup; // Novo formulário para edição

  constructor(private fb: FormBuilder,private scheduleApi:ScheduleService, private categoryApi:CategoryService,private profissionalApi:ProfissionalService, private router:Router,private toast:NgToastService){
    

    
  }


  ngOnInit(): void {
    
    this.registerProfissionlForm = this.fb.group({
      name: ['', Validators.required],
      proName:['', Validators.required],
      phoneNumber: ['', Validators.required],
      identityNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      categoryId: ['', Validators.required],
      profissionalSchedules: [[], Validators.required],
      password: ['', Validators.required],
      photo: ['']
    });

    this.editProfissionalForm = this.fb.group({
      name: ['', Validators.required],
      proName:['', Validators.required],
      phoneNumber: ['', Validators.required],
      identityNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      categoryId: ['', Validators.required],
      profissionalSchedules: [[], Validators.required],
      password: ['', Validators.required],
      photo: ['']
    });

    // Carregar categorias e horários aqui
    this.loadCategories();
    this.loadSchedules();
    this.loadProfissionals();
  }
    
  

  loadProfissionals():void{
    this.profissionalApi.getAllProfissional().subscribe(res =>{
      this.profissionals = res;
      console.log(this.profissionals);
    });
  }
  loadSchedules():void{
    this.scheduleApi.getAll().subscribe(res =>{
      this.schedules=res;
      console.log(this.schedules);
    });
  }

  loadCategories():void {
    this.categoryApi.getAllCategories().subscribe(res =>{
      this.categories=res;
    });
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.description : 'N/A';
  }

  onSubmit(){

    if(this.registerProfissionlForm.valid){
    const profissional = {
      email: this.registerProfissionlForm.value.email,
      phoneNumber: this.registerProfissionlForm.value.phoneNumber,
      name: this.registerProfissionlForm.value.name,
      photo: this.registerProfissionlForm.value.photo,
      identityNumber: this.registerProfissionlForm.value.identityNumber,
      categoryId: this.registerProfissionlForm.value.categoryId,
      scheduleIds: this.registerProfissionlForm.value.profissionalSchedules,
      password:this.registerProfissionlForm.value.password,
      profissionalName: this.registerProfissionlForm.value.proName,
      role:"pro",
    };

    console.log(profissional);

      this.profissionalApi.registerProfissional(profissional).subscribe({
        next:(res)=>{
          console.log("aqui");
          console.log(res);
          this.toast.success('Profissional adicionado',"SUCCESS",5000);
          this.loadProfissionals();
          this.registerProfissionlForm.reset();
        },
        error:(err)=>{
          console.log("err");
          this.toast.danger(err?.error, "ERRO",5000);
        }
      })
    }else{
      console.log("gato");
      this.toast.danger("Formulário inválido","ERRO", 5000);
    }
  }

  onDelete(id:number){
    console.log(id);
    this.profissionalApi.deleteProfissional(id)
    .subscribe({
      next: (res:any)=>{
        this.profissionals=this.profissionals.filter(item => item.id!==id);
        this.toast.info('Um profissional foi removido',"INFO",5000);
      },
      error:(err)=>{
        this.toast.danger(err?.error.message, "Erro ao remover profissional", 5000);
      }
    });
  }

  onEdit(id: number): void {
    this.selectedProfissionalId = id;
    const profissional = this.profissionals.find(p => p.id === id);
    console.log(profissional);
    if (profissional!=null) {
      this.editProfissionalForm.patchValue({
        email: profissional.email,
        phoneNumber: profissional.phoneNumber,
        name: profissional.name,
        photo:profissional.photo,
        identityNumber: profissional.identityNumber,
        categoryId: profissional.categoryId,
        password:profissional.password,
        confirmPassword:profissional.password,
        userName:profissional.profissionalName,
        profissionalSchedules: profissional.scheduleIds,

      });
    }
  }

  onEditSubmit(): void {
    if (this.editProfissionalForm.valid && this.selectedProfissionalId !== null) {
      const updateUserRequest = {
        ...this.editProfissionalForm.value,
        id: this.selectedProfissionalId,
        scheduleIds: this.editProfissionalForm.value.profissionalSchedules
      };

      this.profissionalApi.updateProfissional(updateUserRequest).subscribe({
        next: () => {
          this.toast.success('Profissional atualizado', "SUCCESS", 5000);
          this.loadProfissionals();
          this.selectedProfissionalId = null;
          this.editProfissionalForm.reset();
        },
        error: (err) => {
          this.toast.danger(err?.error.message, "Erro ao atualizar profissional", 5000);
        }
      });
    } else {
      this.toast.danger('Formulário inválido', 'ERRO', 5000);
    }
  }

  
}
