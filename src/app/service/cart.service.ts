import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/cart';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  apiUrl: String = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMyCart(userId: string): Observable<Cart[]> {
    const url = `${this.apiUrl}/cart/myCart?userId=${userId}`;
    return this.http.get<Cart[]>(url);
  }

  saveFavorite(ticketId: number): Observable<any> {
    const requestBody = {
      ticketId: ticketId,
    };
    return this.http.post<any>(`${this.apiUrl}/cart`, requestBody);
  }

  deleteTicket(id: number): Observable<void> {
    const url = `${this.apiUrl}/cart/${id}`;
    return this.http.delete<void>(url);
  }
}
