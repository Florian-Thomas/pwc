import { Component, OnInit } from '@angular/core';
import { LoginForm } from './login-form';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error = null;
  submitted = false;
  model = new LoginForm();

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    this.loginService.login(this.model.username).subscribe({
      next: (res) => {
        console.log('User is logged in');
        this.error = null;
        this.router.navigateByUrl('/game');
      },
      error: (err) => (this.error = err.error.message),
    });
  }
}
