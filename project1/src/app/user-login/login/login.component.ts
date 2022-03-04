import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/sharedServices/api.service';
import { UserModel } from 'src/app/sharedServices/model/user.model';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm !: FormGroup
  public loginObj = new UserModel();
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private api: ApiService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]

    })
  }


  login() {
    this.loginObj.username = this.loginForm.value.username;
    this.loginObj.password = this.loginForm.value.password;
    this.api.login(this.loginObj)
      .subscribe({
        next: (res) => {
          alert(res.message);
          localStorage.setItem('token', res.jwtToken);
          this.loginForm.reset();
          this.router.navigate(['Employee-Dashboard/Employees'])
        },
        error: () => {
          alert("Something Went  Wrong");
        }
      })

  }

}

