import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CampoFiorito } from '../models/campo-fiorito';

@Injectable({
  providedIn: 'root',
})
export class CampoFioritoService {
  apiUrl: String = environment.apiUrl;

  constructor(private http: HttpClient) {}

  submitScore(campoFiorito: CampoFiorito): Observable<CampoFiorito> {
    return this.http.post<CampoFiorito>(
      `${this.apiUrl}/score/submit-score`,
      campoFiorito
    );
  }

  getLeaderboard(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/score/leaderboard`);
  }
}
