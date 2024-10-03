import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../../models/service.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private baseUrl:string = `${environment.apiUrl}/Service`;

  constructor(private http:HttpClient) { }

  getAllServices():Observable<Service[]>{
    return this.http.get<Service[]>(`${this.baseUrl}`);
  }

  registerService(service:any){
    return this.http.post<void>(`${this.baseUrl}`,service);
  }

  deleteService(id:number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateService(service:Service){
    return this.http.put<void>(`${this.baseUrl}`,service);
  }

  getServiceById(id:number):Observable<void>{
    return this.http.get<void>(`${this.baseUrl}/${id}`);
  }
}
