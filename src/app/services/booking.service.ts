import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../../models/booking.model';
import { Observable } from 'rxjs';
import { Service } from '../../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl:string = `${environment.apiUrl}/Booking`;
  constructor(private http:HttpClient) { }

  getAll(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.baseUrl);
  }

  getById(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.baseUrl}/${id}`);
  }

  getBookingsByUser(userId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/user/${userId}`);
  }

  create(bookingAddDto: any){
    return this.http.post<any>(this.baseUrl, bookingAddDto);
  }

  update(bookingUpdateDto: any): Observable<boolean> {
    return this.http.put<boolean>(`${this.baseUrl}/${bookingUpdateDto.id}`, bookingUpdateDto);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`);
  }

  confirmBooking(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/confirm/${id}`, null);
  }

  rescheduleBooking(id: number, newDateTime: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/reschedule/${id}`, { newDateTime });
  }

  // Métodos para obter o valor faturado
  getTodayRevenue(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/revenue/today`);
  }

  getYesterdayRevenue(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/revenue/yesterday`);
  }

  getCurrentMonthRevenue(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/revenue/current-month`);
  }

  getLastMonthRevenue(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/revenue/last-month`);
  }

  // Método para obter o serviço mais solicitado
  getMostRequestedService(): Observable<Service> {
    return this.http.get<Service>(`${this.baseUrl}/most-requested-service`);
  }

   // Método para obter o serviço menos solicitado
   getLeastRequestedService(): Observable<Service> {
    return this.http.get<Service>(`${this.baseUrl}/least-requested-service`);
  }
}
