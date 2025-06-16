import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = null;

      const credentials = {
        username: this.loginForm.get('username')?.value?.trim(),
        password: this.loginForm.get('password')?.value?.trim()
      };

      this.http.post<any>(`${environment.apiUrl}/auth/login`, credentials)
        .subscribe({
          next: (response) => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            this.error = err.error?.message || 'Login failed. Please check your credentials.';
            this.loading = false;
          }
        });
    }
  }
} 