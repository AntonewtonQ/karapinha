import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl:string = `${environment.apiUrl}/User`;

  constructor(private http:HttpClient) { }

  getUser():Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  registerUser(userObj:User){
    return this.http.post<User>(`${this.baseUrl}/Register`,userObj);
  }

  deleteUser(id:number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateUser(userObj:any){
    return this.http.put<User>(`${this.baseUrl}`,userObj);
  }

  getUserById(id:number):Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }
}
