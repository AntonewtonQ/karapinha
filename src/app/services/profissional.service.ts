import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Profissional } from '../../models/profissional.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfissionalService {

  private baseUrl:string = `${environment.apiUrl}/Profissional`;

  constructor(private http:HttpClient, private router:Router) { }

  getAllProfissional():Observable<Profissional[]>{
    return this.http.get<Profissional[]>(`${this.baseUrl}`);
  }

  registerProfissional(profissionalObj:any){
    
    return this.http.post<Profissional>(`${this.baseUrl}`,profissionalObj);
  }

  deleteProfissional(id:number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateProfissional(profissionalObj:any){
    return this.http.put<Profissional>(`${this.baseUrl}`,profissionalObj);
  }

  getProfissionalById(id:number):Observable<Profissional>{
    return this.http.get<Profissional>(`${this.baseUrl}/${id}`);
  }
}

