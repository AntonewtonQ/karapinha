import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ServiceService } from '../../services/service.service';
import { Category } from '../../../models/category.model';
import { Service } from '../../../models/service.model';

@Component({
  selector: 'app-booking-section',
  standalone: true,
  imports: [],
  templateUrl: './booking-section.component.html',
  styleUrl: './booking-section.component.css'
})
export class BookingSectionComponent {

  categories:Category[]=[];
  services:Service[]=[];

  constructor(private categoryApi:CategoryService, private serviceApi:ServiceService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadCategories();
    this.loadServices();
  }



  loadCategories(){
    this.categoryApi.getAllCategories().subscribe(res =>{
      this.categories=res;
      console.log(this.categories);
    });
  }

  loadServices(){
    this.serviceApi.getAllServices().subscribe(res =>{
      this.services=res;
      console.log(this.services);
    });
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.description : 'N/A';
  }

  

}
