import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss',
})
export class BookList implements OnInit {
  books: Book[] = [];

  constructor(
    private bookService: BookService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.bookService.getAll().subscribe((data) => {
      this.books = data;
      this.cdr.detectChanges(); // triggar uppdatering manuellt
    });
  }

  deleteBook(id: string): void {
    this.bookService.delete(id).subscribe(() => {
      this.books = this.books.filter((b) => b.id !== id);
      this.cdr.detectChanges();
    });
  }

  addBook(): void {
    this.router.navigate(['/books/add']);
  }

  editBook(id: string): void {
    this.router.navigate([`/books/edit/${id}`]);
  }
}
