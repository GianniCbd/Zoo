import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Favorite } from '../models/favorite';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  apiUrl: String = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMyFavorite(userId: string): Observable<Favorite[]> {
    const url = `${this.apiUrl}/favorites/myFavorite?userId=${userId}`;
    return this.http.get<Favorite[]>(url);
  }

  saveFavorite(animalId: number): Observable<any> {
    const requestBody = {
      animalId: animalId,
    };
    return this.http
      .post<any>(`${this.apiUrl}/favorites`, requestBody)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong, please try again later.');
  }
}
