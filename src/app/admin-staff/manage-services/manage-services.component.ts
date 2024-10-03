import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { Category } from '../../../models/category.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../../services/service.service';
import { Service } from '../../../models/service.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manage-services',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './manage-services.component.html',
  styleUrl: './manage-services.component.css',
  
})
export class ManageServicesComponent {

  registerServiceForm : FormGroup;
  categories: Category[] = [];
  services:Service[]=[];
  descriptionCategory: string='';
  selectedServiceId: number | null = null; // Add this line to track the selected service

  constructor(
    private serviceApi:ServiceService,
    private categoryApi:CategoryService,
    private router:Router,
    private toast:NgToastService,
    
  ){
    this.registerServiceForm=new FormGroup({
      description: new FormControl('', [Validators.required]),
      price: new FormControl('',Validators.required),
      categoryId: new FormControl('',[Validators.required]),
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadService();
  }

  loadCategories(): void {
    this.categoryApi.getAllCategories().subscribe(res => {
      this.categories = res;
      console.log(this.categories);
    }
  );
  }

  loadService():void{
    this.serviceApi.getAllServices().subscribe(res => {
      this.services = res;
      console.log(this.services);
    }
  );
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.description : 'N/A';
  }

  

  

  CreateService(): void {
    if (this.registerServiceForm.valid) {
      const serviceRequest = {
        description: this.registerServiceForm.value.description,
        price: this.registerServiceForm.value.price,
        categoryId: this.registerServiceForm.value.categoryId
      };

      if (this.selectedServiceId) {
        // Edit mode: Update existing service
        this.serviceApi.updateService({ ...serviceRequest, id: this.selectedServiceId }).subscribe(() => {
          this.toast.success('Serviço atualizado com sucesso', 'SUCCESS', 5000);
          this.registerServiceForm.reset();
          this.selectedServiceId = null;
          this.loadService();
        });
      } else {
        // Normal mode: Add new service
        this.serviceApi.registerService(serviceRequest).subscribe(() => {
          this.toast.success('Serviço adicionado com sucesso', 'SUCCESS', 5000);
          this.registerServiceForm.reset();
          this.loadService();
        });
      }
    }
  }

  

  onEdit(service: Service): void {
    this.selectedServiceId = service.id;
    this.registerServiceForm.patchValue({
      description: service.description,
      price: service.price,
      categoryId: service.categoryId
    });
  }

  cancelEdit(): void {
    this.selectedServiceId = null;
    this.registerServiceForm.reset();
  }

  DeleteService(id: number): void {
    this.serviceApi.deleteService(id).subscribe(() => {
      this.services = this.services.filter(item => item.id !== id);
      this.toast.info('Serviço Removido', 'INFO', 5000);
    });
  }
}
