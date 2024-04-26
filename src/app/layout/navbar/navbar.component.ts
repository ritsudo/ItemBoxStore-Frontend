import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { backendUrl } from '../../app.config';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  apiUrl = backendUrl;
}
