import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quote } from '../models/quote';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private apiUrl = environment.apiUrl + '/api/quotes';

  constructor(private http: HttpClient) {}

  // hämta alla citat
  getAll() {
    return this.http.get<Quote[]>(this.apiUrl);
  }

  // hämta ett citat med id
  getById(id: string) {
    return this.http.get<Quote>(`${this.apiUrl}/${id}`);
  }

  // lägg till ett nytt citat
  create(quote: Quote) {
    return this.http.post<Quote>(this.apiUrl, quote);
  }

  // uppdatera ett citat
  update(id: string, quote: Quote) {
    return this.http.put(`${this.apiUrl}/${id}`, quote);
  }

  // ta bort ett citat
  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
