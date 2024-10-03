import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = `${environment.apiUrl}/User`;
  private proUrl:string = `${environment.apiUrl}/Profissional`;


  constructor(private http:HttpClient,private router:Router) { }

  signUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}/Register`,userObj);
  }

  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}/authenticate`,loginObj);
  }
  loginPro(loginObj:any){
    return this.http.post<any>(`${this.proUrl}/authenticate`,loginObj);
  }

  activateUser(userId: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Activate/${userId}`, {});
  }

  desativateUser(userId: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Desativate/${userId}`, {});
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }
  
  storeRefreshToken(tokenValue: string){
    localStorage.setItem('refreshToken', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }
  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }
  /*

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }

  getfullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.name;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }

  renewToken(tokenApi : TokenApiModel){
    return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi)
  }
    */
}
