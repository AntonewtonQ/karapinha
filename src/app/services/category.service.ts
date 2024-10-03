import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Category } from '../../models/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  
  private baseUrl:string = `${environment.apiUrl}/Category`;

  constructor(private http:HttpClient) { }

  getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.baseUrl}`);
  }

  registerCategory(category :any):Observable<void>{
    return this.http.post<void>(`${this.baseUrl}`,category);
  }

  deleteCategory(id:number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateCategory(category :any):Observable<void>{
    return this.http.put<void>(`${this.baseUrl}`,category);
  }

  getCategoryById(id:number):Observable<Category>{
    return this.http.get<Category>(`${this.baseUrl}/${id}`);
  }

  

}
