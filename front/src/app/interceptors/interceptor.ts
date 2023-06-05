import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, throwError } from 'rxjs';
import { LoginService } from '../services/login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private loginService: LoginService) {}

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      this.loginService.logout();
      this.router.navigateByUrl(`/login`);
      return of(err.message);
    }
    return throwError(() => {
      return err;
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.has('bypassInterceptor')) {
      const clonedRequest = req.clone({
        headers: req.headers.delete('bypassInterceptor'),
      });
      return next.handle(clonedRequest);
    }

    const idToken = localStorage.getItem('id_token');
    let base_url = '';
    if (isDevMode()) {
      base_url = 'http://localhost:3000/';
    }

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + idToken),
        url: base_url + req.url,
      });

      return next
        .handle(cloned)
        .pipe(catchError((x) => this.handleAuthError(x)));
    } else {
      const cloned = req.clone({
        url: base_url + req.url,
      });
      return next
        .handle(cloned)
        .pipe(catchError((x) => this.handleAuthError(x)));
    }
  }
}
