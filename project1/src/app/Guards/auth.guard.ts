import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../sharedServices/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private route:Router) { }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      return true;
    }else{
      alert("don't have access!! Do Log In! ")
      this.route.navigate(["user/login"]);
      return false;
    }
  }

}
