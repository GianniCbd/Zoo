import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Like } from '../models/like';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  apiUrl: String = environment.apiUrl;

  constructor(private http: HttpClient) {}

  like(animalId: number, data: Partial<Like>): Observable<Like> {
    const params = new HttpParams().set('animalId', animalId.toString());
    return this.http.post<Like>(`${this.apiUrl}/likes`, data, { params });
  }

  deleteLike(userId: string, title: string, id: number): Observable<void> {
    const params = new HttpParams()
      .set('userId', userId)
      .set('id', id.toString());
    return this.http.delete<void>(`${this.apiUrl}/likes/delete/${title}`, {
      params,
    });
  }

  getlike(userId: string, id: number): Observable<Like> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Like>(`${this.apiUrl}/likes/user/${id}`, { params });
  }
}
