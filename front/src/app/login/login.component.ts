import { Component, OnInit } from '@angular/core';
import { LoginForm } from './login-form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error = null;
  submitted = false;
  model = new LoginForm();

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.model);
  }
}
