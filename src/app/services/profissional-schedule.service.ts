import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ProfissionalSchedule } from '../../models/profissionalSchedule.model';
import { Schedule } from '../../models/schedule.model';

@Injectable({
  providedIn: 'root'
})
export class ProfissionalScheduleService {

  private baseUrl:string = `${environment.apiUrl}/ProfissionalSchedule`;

  constructor(private http: HttpClient) { }

  getProfissionalSchedules(): Observable<ProfissionalSchedule[]> {
    return this.http.get<ProfissionalSchedule[]>(this.baseUrl);
  }

  getProfissionalSchedule(id: number): Observable<ProfissionalSchedule> {
    return this.http.get<ProfissionalSchedule>(`${this.baseUrl}/${id}`);
  }

  createProfissionalSchedule(profissionalScheduleAddDto: any): Observable<any> {
    return this.http.post(this.baseUrl, profissionalScheduleAddDto);
  }

  updateProfissionalSchedule(id: number, profissionalScheduleUpdateDto: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, profissionalScheduleUpdateDto);
  }

  deleteProfissionalSchedule(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getByScheduleId(scheduleId: number): Observable<ProfissionalSchedule[]> {
    return this.http.get<ProfissionalSchedule[]>(`${this.baseUrl}/schedule/${scheduleId}`);
  }

  getSchedulesByProfissionalId(profissionalId: number): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.baseUrl}/profissional/${profissionalId}`);
  }

 
}
