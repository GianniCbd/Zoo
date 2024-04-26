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

  like(animalId: number, like: Like): Observable<any> {
    const url = `${this.apiUrl}/likes?animalId=${animalId}`;
    return this.http.post(url, like);
  }

  deleteLike(userId: string, title: string, id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/likes/delete/${title}?userId=${userId}&id=${id}`
    );
  }

  getMyLike(userId: string, likeId: number): Observable<Like> {
    return this.http.get<Like>(
      `${this.apiUrl}/likes/user/${likeId}?userId=${userId}`
    );
  }
}
