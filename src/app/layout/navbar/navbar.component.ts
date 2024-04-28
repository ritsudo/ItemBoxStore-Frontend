import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { backendUrl } from '../../app.config';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { jwtDecode } from "jwt-decode";

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
  userName = "test";

  constructor (
    private cookieService: CookieService) {
  }

  ngOnInit() {
    const jwt = this.cookieService.get('JWT');

    if (jwt) {
      this.jwtLength = jwt.length;
      
      const decodedToken : any = jwtDecode(jwt);
      console.log(decodedToken);
      this.userName = decodedToken.UserName;
    }
  }

  logout() {
    this.cookieService.delete('JWT');
    this.jwtLength = 0;
  }
}
