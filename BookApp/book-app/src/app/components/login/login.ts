import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  username = '';
  password = '';
  errorMessage = '';

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (data) => {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/books']);
      },
      error: (err) => {
        this.errorMessage = 'Felaktigt användarnamn eller lösenord';
        this.cdr.detectChanges();
      },
    });
  }
}
