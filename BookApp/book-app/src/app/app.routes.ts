import { Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { BookForm } from './components/book-form/book-form';
import { BookList } from './components/book-list/book-list';
import { QuoteList } from './components/quote-list/quote-list';
import { QuoteForm } from './components/quote-form/quote-form';
import { authGuard } from './guards/auth-guard';
import { loginGuard } from './guards/login-guard';

export const routes: Routes = [
  { path: 'register', component: Register, canActivate: [loginGuard] },
  { path: 'login', component: Login, canActivate: [loginGuard] },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: 'books', component: BookList },
      { path: 'books/add', component: BookForm },
      { path: 'books/edit/:id', component: BookForm },
      { path: 'quotes', component: QuoteList },
      { path: 'quotes/add', component: QuoteForm },
      { path: 'quotes/edit/:id', component: QuoteForm },
    ],
  },
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
