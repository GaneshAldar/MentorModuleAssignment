import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/sharedServices/api.service';
import { UserModel } from 'src/app/sharedServices/model/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm !: FormGroup
  public signupObj = new UserModel();
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private api: ApiService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],


    })
  }
  signUp() {
    this.signupObj.username = this.signupForm.value.username;
    this.signupObj.email = this.signupForm.value.email;
    this.signupObj.password = this.signupForm.value.password;
    this.api.signUp(this.signupObj)
      .subscribe({
        next: (res) => {
          alert(res.message);
          this.signupForm.reset();
          this.router.navigate(['user/login'])
        },
        error: () => {
          alert("Something Went  Wrong");
        }
      })
  }

}
