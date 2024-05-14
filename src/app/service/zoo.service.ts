import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Zoo } from '../models/zoo';

@Injectable({
  providedIn: 'root',
})
export class ZooService {
  apiUrl: String = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllZoos(orderBy: string = 'id'): Observable<Zoo[]> {
    return this.http.get<Zoo[]>(`${this.apiUrl}/zoo/all`, {
      params: { orderBy },
    });
  }

  saveZoo(zoo: Zoo): Observable<Zoo> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Zoo>(`${this.apiUrl}/zoo/save`, zoo, { headers });
  }

  getZooById(id: number): Observable<Zoo> {
    return this.http.get<Zoo>(`${this.apiUrl}/zoo/${id}`);
  }

  updateZoo(id: number, zoo: Zoo): Observable<Zoo> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Zoo>(`${this.apiUrl}/zoo/${id}`, zoo, { headers });
  }
}
