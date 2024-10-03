import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProNavComponent } from './pro-nav/pro-nav.component';

@Component({
  selector: 'app-profissional',
  standalone: true,
  imports: [RouterOutlet,ProNavComponent],
  templateUrl: './profissional.component.html',
  styleUrl: './profissional.component.css'
})
export class ProfissionalComponent {

}
