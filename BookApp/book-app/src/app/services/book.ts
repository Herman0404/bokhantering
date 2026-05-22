import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = environment.apiUrl + '/api/books';

  constructor(private http: HttpClient) {}

  // hämta alla böcker
  getAll() {
    return this.http.get<Book[]>(this.apiUrl);
  }

  // hämta en bok med id
  getById(id: string) {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  // lägg till en ny bok
  create(book: Book) {
    return this.http.post<Book>(this.apiUrl, book);
  }

  // uppdatera en bok
  update(id: string, book: Book) {
    return this.http.put(`${this.apiUrl}/${id}`, book);
  }

  // ta bort en bok
  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
