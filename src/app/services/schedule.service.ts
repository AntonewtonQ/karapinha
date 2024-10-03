import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Schedule } from '../../models/schedule.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private baseUrl:string = `${environment.apiUrl}/Schedule`;
  constructor(private http:HttpClient) { }

  getAll(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.baseUrl}`);
  }

  getById(id: number): Observable<Schedule> {
    return this.http.get<Schedule>(`${this.baseUrl}/${id}`);
  }

  create(scheduleAddDto: any): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl, scheduleAddDto);
  }

  update(scheduleUpdateDto: any): Observable<boolean> {
    return this.http.put<boolean>(`${this.baseUrl}/${scheduleUpdateDto.id}`, scheduleUpdateDto);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`);
  }

  getByProfissionalId(profissionalId: number): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.baseUrl}/by-professional/${profissionalId}`);
  }
}
