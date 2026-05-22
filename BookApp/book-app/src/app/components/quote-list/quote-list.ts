import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { QuoteService } from '../../services/quote';
import { Quote } from '../../models/quote';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quote-list',
  imports: [CommonModule],
  templateUrl: './quote-list.html',
  styleUrl: './quote-list.scss',
})
export class QuoteList implements OnInit {
  quotes: Quote[] = [];

  constructor(
    private quoteService: QuoteService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.quoteService.getAll().subscribe((data) => {
      this.quotes = data;
      this.cdr.detectChanges();
    });
  }

  deleteQuote(id: string): void {
    this.quoteService.delete(id).subscribe(() => {
      this.quotes = this.quotes.filter((q) => q.id !== id);
      this.cdr.detectChanges();
    });
  }

  addQuote(): void {
    this.router.navigate(['quotes/add']);
  }

  editQuote(id: string): void {
    this.router.navigate([`quotes/edit/${id}`]);
  }
}
