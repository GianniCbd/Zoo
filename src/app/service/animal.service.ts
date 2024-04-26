import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Animal } from '../models/animal';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  apiUrl: String = environment.apiUrl;
  currentPage: number = 0;

  constructor(private http: HttpClient) {}

  getAnimals(page: number = 0): Observable<Animal[]> {
    const params = new HttpParams().set('page', page.toString());
    this.currentPage = page;
    return this.http
      .get<Page<Animal>>(`${this.apiUrl}/animals/all`, { params })
      .pipe(map((list) => list.content));
  }

  findById(id: number): Observable<Animal> {
    const url = `${this.apiUrl}/animals/${id}`;
    return this.http.get<Animal>(url);
  }

  newAnimal(data: Partial<Animal>, userId: string): Observable<Animal> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.getAccessToken,
      'Content-Type': 'application/json',
    });
    return this.http.post<Animal>(
      `${this.apiUrl}/animals/save?userId=${userId}`,
      data,
      { headers }
    );
  }

  updateAnimal(id: number, animal: Animal): Observable<Animal> {
    const url = `${this.apiUrl}/animals/${id}`;
    return this.http.put<Animal>(url, animal);
  }

  deleteAnimal(id: number): Observable<void> {
    const url = `${this.apiUrl}/animals/${id}`;
    return this.http.delete<void>(url);
  }

  uploadAvatar(id: number, image: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', image);
    const url = `${this.apiUrl}/animals/upload/${id}`;
    return this.http.patch(url, formData, { responseType: 'text' });
  }

  getCountAnimalsByHabitat(): Observable<Object[]> {
    return this.http.get<Object[]>(`${this.apiUrl}/animals/countByHabitat`);
  }

  private getAccessToken(): string {
    return localStorage.getItem('access_token') || '';
  }
}
