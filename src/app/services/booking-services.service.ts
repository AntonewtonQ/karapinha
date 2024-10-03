import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BookingService } from './booking.service';
import { Observable } from 'rxjs';
import { RBookingService } from '../../models/rbookingService.model';

@Injectable({
  providedIn: 'root'
})
export class BookingServicesService {

  private baseUrl:string = `${environment.apiUrl}/BookingService`;
  constructor(private http:HttpClient) { }

  getAll(): Observable<RBookingService[]> {
    return this.http.get<RBookingService[]>(this.baseUrl);
  }

  getById(id: number): Observable<RBookingService> {
    return this.http.get<RBookingService>(`${this.baseUrl}/${id}`);
  }


  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`);
  }

  getByProfissional(id:number): Observable<RBookingService[]>{
    return this.http.get<RBookingService[]>(`${this.baseUrl}/ByProfessional/${id}`);
  }

  getByBooking(id:number): Observable<RBookingService[]>{
    return this.http.get<RBookingService[]>(`${this.baseUrl}/ByBooking/${id}`);
  }
}
