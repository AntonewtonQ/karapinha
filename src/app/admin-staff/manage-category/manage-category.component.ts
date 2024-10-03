import { Component } from '@angular/core';
import { Category } from '../../../models/category.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-manage-category',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.css'
})
export class ManageCategoryComponent {

  public categories:Category[]=[];
  registerCategoryForm:FormGroup;

  public isEditMode: boolean = false;
  public editingCategoryId: number | null = null;

  constructor(private categoryApi:CategoryService, private router:Router,private toast:NgToastService){
    this.registerCategoryForm=new FormGroup({
      description: new FormControl('',Validators.required),
    });
  }

  ngOnInit(): void {
    this.loadCategories();  
  }

  loadCategories(): void {
    this.categoryApi.getAllCategories().subscribe(res => {
      this.categories = res;
      console.log(this.categories);
    },
    error=>{
      this.toast.danger(error,"ALGO CORREU MAL",5000);
    },
  );
  }

  CreateCategory(): void {
    if (this.registerCategoryForm.valid) {
      const addCategoryRequest = {
        description: this.registerCategoryForm.value.description
      };

      if (this.isEditMode && this.editingCategoryId !== null) {
        // Edit mode: Update existing category
        this.categoryApi.updateCategory({ ...addCategoryRequest, id: this.editingCategoryId }).subscribe({
          next: (res) => {
            this.toast.success('Categoria atualizada com sucesso', 'SUCCESS', 5000);
            this.registerCategoryForm.reset();
            this.loadCategories();
            this.isEditMode = false;
            this.editingCategoryId = null;
          },
          error: (err) => {
            this.toast.danger((err?.error.message));
          }
        });
      } else {
        // Normal mode: Add new category
        this.categoryApi.registerCategory(addCategoryRequest).subscribe({
          next: (res) => {
            this.toast.success('Categoria adicionada com sucesso', 'SUCCESS', 5000);
            this.registerCategoryForm.reset();
            this.loadCategories();
          },
          error: (err) => {
            this.toast.danger((err?.error.message));
          }
        });
      }
    }
  }




  UpdateCategory(category: Category): void {
    this.isEditMode = true;
    this.editingCategoryId = category.id;
    this.registerCategoryForm.patchValue({
      description: category.description
    });
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.editingCategoryId = null;
    this.registerCategoryForm.reset();
  }

  DeleteCategory(id:number):void{
    this.categoryApi.deleteCategory(id)
    .subscribe(() =>{
      this.categories =this.categories.filter(item => item.id!=id);
      this.toast.info('Categoria Removida','INFO',5000);
    });
  }



}
