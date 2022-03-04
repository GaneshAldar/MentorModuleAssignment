import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './sharedServices/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService, private route: Router) { }
  title = 'project';
 

  logout() {
    if (this.authService.isLoggedIn()) {
      this.authService.isLoggedOut();
      this.route.navigate(["user/login"]);
    }

  }


}

