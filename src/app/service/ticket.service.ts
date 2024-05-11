import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ticket } from '../models/ticket';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  apiUrl: String = environment.apiUrl;
  currentPage: number = 0;

  constructor(private http: HttpClient) {}

  getTickets(page: number = 0): Observable<Ticket[]> {
    const params = new HttpParams().set('page', page.toString());
    this.currentPage = page;
    return this.http
      .get<Page<Ticket>>(`${this.apiUrl}/tickets/all`, { params })
      .pipe(map((list) => list.content));
  }

  getMyTicket(userId: string): Observable<Ticket[]> {
    const url = `${this.apiUrl}/tickets/myTicket?userId=${userId}`;
    return this.http.get<Ticket[]>(url);
  }

  saveTicket(ticketId: number): Observable<any> {
    const requestBody = {
      ticketId: ticketId,
    };
    return this.http.post<any>(`${this.apiUrl}/cart`, requestBody);
  }

  newTicket(data: Partial<Ticket>, userId: string): Observable<Ticket> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.getAccessToken,
      'Content-Type': 'application/json',
    });
    return this.http.post<Ticket>(
      `${this.apiUrl}/tickets/create?userId=${userId}`,
      data,
      { headers }
    );
  }

  deleteTicket(id: number): Observable<void> {
    const url = `${this.apiUrl}/tickets/${id}`;
    return this.http.delete<void>(url);
  }

  private getAccessToken(): string {
    return localStorage.getItem('access_token') || '';
  }
}
