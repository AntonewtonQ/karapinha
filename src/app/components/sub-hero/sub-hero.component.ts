import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../../../models/service.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-sub-hero',
  standalone: true,
  imports: [HttpClientModule,AsyncPipe],
  templateUrl: './sub-hero.component.html',
  styleUrl: './sub-hero.component.css'
})
export class SubHeroComponent {

  

  apiUrl : string = environment.apiUrl;

  http = inject(HttpClient);

  services$ = this.getServices();

  private getServices(): Observable<Service[]>{
    return this.http.get<Service[]>(`${this.apiUrl}/Service`);
  }
}
