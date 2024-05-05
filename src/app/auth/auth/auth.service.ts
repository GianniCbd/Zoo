import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthData } from './auth-data';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  apiURL = environment.apiUrl;
  private authSubj = new BehaviorSubject<null | AuthData>(null);
  user$ = this.authSubj.asObservable();
  utente!: AuthData;

  constructor(private http: HttpClient, private router: Router) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
      errorMessage = error.error;
    }

    return throwError(
      () => new Error('Something bad happened; please try again late.')
    );
  }

  login(data: { email: string; password: string }) {
    return this.http.post<AuthData>(`${this.apiURL}/auth/login`, data).pipe(
      tap((loggato) => {
        console.log(loggato);
        this.authSubj.next(loggato);
        this.utente = loggato;
        console.log(this.utente);
        localStorage.setItem('user', JSON.stringify(loggato));
        this.router.navigate(['/intro']);
      }),
      catchError(this.handleError)
    );
  }

  register(data: Partial<AuthData>) {
    return this.http.post(`${this.apiURL}/auth/register`, data).pipe(
      tap(() => {
        this.router.navigate(['/login']);
      }),
      catchError(this.handleError)
    );
  }

  logout() {
    this.authSubj.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
  restore() {
    const user = localStorage.getItem('user');
    if (!user) {
      this.router.navigate(['/intro']);
      return;
    }
    const userData: AuthData = JSON.parse(user);
    if (this.jwtHelper.isTokenExpired(userData.accessToken)) {
      this.router.navigate(['/intro']);
      return;
    }
    this.authSubj.next(userData);
  }
  getMe(): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/users/me`);
  }
}
