import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isLoggedIn(){
    return localStorage.getItem("token")!=null;
  }

  
  isLoggedOut(){
 
    return localStorage.removeItem("token");
  }
}
