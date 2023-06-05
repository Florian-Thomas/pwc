import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { shareReplay, tap } from 'rxjs/operators';
import * as moment from 'moment';

interface AuthResult {
  access_token: string;
  expires_in: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  login(username: string | null) {
    return this.http.post<AuthResult>('auth/login', { username }).pipe(
      tap((res) => this.setSession(res)),
      shareReplay()
    );
  }
  private setSession(authResult: AuthResult) {
    const expiresAt = moment().add(authResult.expires_in, 'second');

    localStorage.setItem('id_token', authResult.access_token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }
  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    if (expiration == null) {
      return null;
    } else {
      const expiresAt = JSON.parse(expiration);

      return moment(expiresAt);
    }
  }
}
