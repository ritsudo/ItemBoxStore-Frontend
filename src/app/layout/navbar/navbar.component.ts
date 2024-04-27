import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { backendUrl } from '../../app.config';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [CookieService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  apiUrl = backendUrl;
  jwtLength: number = 0;

  constructor (
    private cookieService: CookieService) {
  }

  ngOnInit() {
    this.jwtLength = this.cookieService.get('JWT').length;
  }

  logout() {
    this.cookieService.delete('JWT');
    this.jwtLength = 0;
  }
}
