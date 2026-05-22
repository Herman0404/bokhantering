import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QuoteService } from '../../services/quote';
import { Quote } from '../../models/quote';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quote-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './quote-form.html',
  styleUrl: './quote-form.scss',
})
export class QuoteForm implements OnInit {
  isEditMode = false;
  quoteId: string | null = null;

  text = '';
  author = '';

  constructor(
    private quoteService: QuoteService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.quoteId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.quoteId;

    if (this.isEditMode && this.quoteId) {
      this.quoteService.getById(this.quoteId).subscribe((quote: Quote) => {
        this.text = quote.text;
        this.author = quote.author;
        this.cdr.detectChanges();
      });
    }
  }

  save(f: any): void {
    if (f.invalid) return;

    const quote: Partial<Quote> = {
      text: this.text,
      author: this.author,
    };

    if (this.isEditMode && this.quoteId) {
      this.quoteService.update(this.quoteId, quote as Quote).subscribe(() => {
        this.router.navigate(['/quotes']);
      });
    } else {
      this.quoteService.create(quote as Quote).subscribe(() => {
        this.router.navigate(['/quotes']);
      });
    }
  }
}
