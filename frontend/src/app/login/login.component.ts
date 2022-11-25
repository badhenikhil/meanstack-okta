import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(private _router: Router, private loginService: LoginService) {}
  login() {
    if (this.loginForm.valid) {
      const loginResponse = this.loginService.login(this.loginForm.value);
      loginResponse.subscribe(
        (data: any) => {
          console.log(data);
          localStorage.setItem('token', data.token);
          this._router.navigateByUrl('/dashboard');
        },
        (error) => {
          console.log(error.error);
        }
      );
    } else {
      console.log('invalid');
    }
  }
}
