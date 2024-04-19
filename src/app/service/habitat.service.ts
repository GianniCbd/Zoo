import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Habitat } from '../models/habitat';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root',
})
export class HabitatService {
  apiUrl: String = environment.apiUrl;
  currentPage: number = 0;

  constructor(private http: HttpClient) {}

  getHabitats(page: number = 0): Observable<Habitat[]> {
    const params = new HttpParams().set('page', page.toString());
    this.currentPage = page;
    return this.http
      .get<Page<Habitat>>(`${this.apiUrl}/habitats/all`, { params })
      .pipe(map((list) => list.content));
  }

  findById(id: number): Observable<Habitat> {
    const url = `${this.apiUrl}/habitats/${id}`;
    return this.http.get<Habitat>(url);
  }

  saveHabitats(habitat: Habitat): Observable<Habitat> {
    const url = `${this.apiUrl}/habitats/save`;
    return this.http.post<Habitat>(url, habitat);
  }

  updateHabitats(id: number, habitats: any): Observable<Habitat> {
    return this.http.put<Habitat>(`${this.apiUrl}/habitats/${id}`, habitats);
  }
  deleteHabitat(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/habitats/${id}`);
  }
}
