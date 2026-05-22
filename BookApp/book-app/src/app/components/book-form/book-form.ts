import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookService } from '../../services/book';
import { Book } from '../../models/book';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './book-form.html',
  styleUrl: './book-form.scss',
})
export class BookForm implements OnInit {
  isEditMode = false;
  bookId: string | null = null;

  title = '';
  author = '';
  publishedDate = '';
  description?: string;
  genre?: string;

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.bookId;

    if (this.isEditMode && this.bookId) {
      this.bookService.getById(this.bookId).subscribe((book: Book) => {
        this.title = book.title;
        this.author = book.author;
        this.publishedDate = book.publishedDate.split('T')[0];
        this.description = book.description;
        this.genre = book.genre;
        this.cdr.detectChanges();
      });
    }
  }

  save(f: any): void {
    if (f.invalid) return;

    const book: Partial<Book> = {
      title: this.title,
      author: this.author,
      publishedDate: this.publishedDate,
      description: this.description,
      genre: this.genre,
    };

    if (this.isEditMode && this.bookId) {
      this.bookService.update(this.bookId, book as Book).subscribe(() => {
        this.router.navigate(['/books']);
      });
    } else {
      this.bookService.create(book as Book).subscribe(() => {
        this.router.navigate(['/books']);
      });
    }
  }
}
