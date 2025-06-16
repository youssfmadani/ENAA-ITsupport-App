import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h3 class="text-center">Register</h3>
            </div>
            <div class="card-body">
              <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    formControlName="username"
                    [ngClass]="{'is-invalid': registerForm.get('username')?.invalid && registerForm.get('username')?.touched}"
                    placeholder="Enter your username"
                  >
                  <div class="invalid-feedback" *ngIf="registerForm.get('username')?.invalid && registerForm.get('username')?.touched">
                    Username is required (min 3 characters)
                  </div>
                </div>

                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    formControlName="email"
                    [ngClass]="{'is-invalid': registerForm.get('email')?.invalid && registerForm.get('email')?.touched}"
                    placeholder="Enter your email"
                  >
                  <div class="invalid-feedback" *ngIf="registerForm.get('email')?.invalid && registerForm.get('email')?.touched">
                    Valid email is required
                  </div>
                </div>

                <div class="mb-3">
                  <label for="firstName" class="form-label">First Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="firstName"
                    formControlName="firstName"
                    [ngClass]="{'is-invalid': registerForm.get('firstName')?.invalid && registerForm.get('firstName')?.touched}"
                    placeholder="Enter your first name"
                  >
                  <div class="invalid-feedback" *ngIf="registerForm.get('firstName')?.invalid && registerForm.get('firstName')?.touched">
                    First name is required (min 2 characters)
                  </div>
                </div>

                <div class="mb-3">
                  <label for="lastName" class="form-label">Last Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="lastName"
                    formControlName="lastName"
                    [ngClass]="{'is-invalid': registerForm.get('lastName')?.invalid && registerForm.get('lastName')?.touched}"
                    placeholder="Enter your last name"
                  >
                  <div class="invalid-feedback" *ngIf="registerForm.get('lastName')?.invalid && registerForm.get('lastName')?.touched">
                    Last name is required (min 2 characters)
                  </div>
                </div>

                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    formControlName="password"
                    [ngClass]="{'is-invalid': registerForm.get('password')?.invalid && registerForm.get('password')?.touched}"
                    placeholder="Enter your password"
                  >
                  <div class="invalid-feedback" *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched">
                    Password is required (min 6 characters)
                  </div>
                </div>

                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">Confirm Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="confirmPassword"
                    formControlName="confirmPassword"
                    [ngClass]="{'is-invalid': registerForm.get('confirmPassword')?.invalid && registerForm.get('confirmPassword')?.touched}"
                    placeholder="Confirm your password"
                  >
                  <div class="invalid-feedback" *ngIf="registerForm.get('confirmPassword')?.invalid && registerForm.get('confirmPassword')?.touched">
                    Passwords must match
                  </div>
                </div>

                <div class="alert alert-danger" *ngIf="error">
                  {{ error }}
                </div>

                <div class="d-grid gap-2">
                  <button 
                    type="submit" 
                    class="btn btn-primary btn-lg" 
                    [disabled]="registerForm.invalid || loading"
                    [class.btn-loading]="loading"
                  >
                    <span *ngIf="!loading">Register</span>
                    <span *ngIf="loading">
                      <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Registering...
                    </span>
                  </button>
                </div>

                <div class="text-center mt-3">
                  <p>Already have an account? <a routerLink="/login" class="text-primary">Login here</a></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      border: none;
      border-radius: 8px;
    }
    .card-header {
      background-color: #f8f9fa;
      border-bottom: 1px solid rgba(0, 0, 0, 0.125);
      border-radius: 8px 8px 0 0 !important;
      padding: 1.5rem;
    }
    .card-body {
      padding: 2rem;
    }
    .btn-primary {
      padding: 0.75rem 1.5rem;
      font-weight: 500;
      transition: all 0.2s ease-in-out;
    }
    .btn-primary:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .btn-primary:disabled {
      cursor: not-allowed;
      opacity: 0.7;
    }
    .form-control {
      padding: 0.75rem 1rem;
      border-radius: 6px;
    }
    .form-control:focus {
      box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.15);
    }
    .invalid-feedback {
      font-size: 0.875rem;
    }
    .text-primary {
      text-decoration: none;
      font-weight: 500;
    }
    .text-primary:hover {
      text-decoration: underline;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.error = null;

      const { confirmPassword, ...userData } = this.registerForm.value;

      this.http.post<any>(`${environment.apiUrl}/auth/register`, userData)
        .subscribe({
          next: () => {
            this.router.navigate(['/login']);
          },
          error: (err) => {
            this.error = err.error?.message || 'Registration failed. Please try again.';
            this.loading = false;
          }
        });
    }
  }
} 