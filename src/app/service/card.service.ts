import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from '../models/card';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  apiUrl: String = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMyCards(
    page: number = 0,
    size: number = 10,
    orderBy: string = 'id'
  ): Observable<Page<Card>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('orderBy', orderBy);

    return this.http.get<Page<Card>>(`${this.apiUrl}/card/my-card`, { params });
  }

  findById(id: string): Observable<Card> {
    const url = `${this.apiUrl}/card/${id}`;
    return this.http.get<Card>(url);
  }

  newCard(data: Partial<Card>, userId: string): Observable<Card> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.getAccessToken,
      'Content-Type': 'application/json',
    });
    return this.http.post<Card>(`${this.apiUrl}/card?userId=${userId}`, data, {
      headers,
    });
  }

  makePayment(cardId: string, amount: number): Observable<any> {
    const url = `${this.apiUrl}/card/${cardId}/payments`;
    const body = { amount: amount };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, body, { headers: headers });
  }

  deleteCard(id: string): Observable<void> {
    const url = `${this.apiUrl}/card/${id}`;
    return this.http.delete<void>(url);
  }

  private getAccessToken(): string {
    return localStorage.getItem('access_token') || '';
  }
}
