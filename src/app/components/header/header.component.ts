import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Category } from '../../../models/category.model';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,HttpClientModule,AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  apiUrl : string = environment.apiUrl;

  http = inject(HttpClient);

  categories$ = this.getCategories();

  private getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.apiUrl}/Category`);
  }

}
