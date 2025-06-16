import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-technician-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">
              <h3 class="text-center">{{ isEditMode ? 'Edit' : 'Add' }} Technician</h3>
            </div>
            <div class="card-body">
              <form [formGroup]="technicianForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    formControlName="username"
                    [ngClass]="{'is-invalid': technicianForm.get('username')?.invalid && technicianForm.get('username')?.touched}"
                    placeholder="Enter username"
                  >
                  <div class="invalid-feedback" *ngIf="technicianForm.get('username')?.invalid && technicianForm.get('username')?.touched">
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
                    [ngClass]="{'is-invalid': technicianForm.get('email')?.invalid && technicianForm.get('email')?.touched}"
                    placeholder="Enter email"
                  >
                  <div class="invalid-feedback" *ngIf="technicianForm.get('email')?.invalid && technicianForm.get('email')?.touched">
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
                    [ngClass]="{'is-invalid': technicianForm.get('firstName')?.invalid && technicianForm.get('firstName')?.touched}"
                    placeholder="Enter first name"
                  >
                  <div class="invalid-feedback" *ngIf="technicianForm.get('firstName')?.invalid && technicianForm.get('firstName')?.touched">
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
                    [ngClass]="{'is-invalid': technicianForm.get('lastName')?.invalid && technicianForm.get('lastName')?.touched}"
                    placeholder="Enter last name"
                  >
                  <div class="invalid-feedback" *ngIf="technicianForm.get('lastName')?.invalid && technicianForm.get('lastName')?.touched">
                    Last name is required (min 2 characters)
                  </div>
                </div>

                <div class="mb-3" *ngIf="!isEditMode">
                  <label for="password" class="form-label">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    formControlName="password"
                    [ngClass]="{'is-invalid': technicianForm.get('password')?.invalid && technicianForm.get('password')?.touched}"
                    placeholder="Enter password"
                  >
                  <div class="invalid-feedback" *ngIf="technicianForm.get('password')?.invalid && technicianForm.get('password')?.touched">
                    Password is required (min 6 characters)
                  </div>
                </div>

                <div class="alert alert-danger" *ngIf="error">
                  {{ error }}
                </div>

                <div class="d-grid gap-2">
                  <button 
                    type="submit" 
                    class="btn btn-primary btn-lg" 
                    [disabled]="technicianForm.invalid || loading"
                    [class.btn-loading]="loading"
                  >
                    <span *ngIf="!loading">{{ isEditMode ? 'Update' : 'Add' }} Technician</span>
                    <span *ngIf="loading">
                      <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      {{ isEditMode ? 'Updating...' : 'Adding...' }}
                    </span>
                  </button>
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
  `]
})
export class TechnicianFormComponent implements OnInit {
  technicianForm: FormGroup;
  loading = false;
  error: string | null = null;
  isEditMode = false;
  technicianId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.technicianForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.technicianId = +id;
      this.loadTechnician();
      // Remove password validation in edit mode
      this.technicianForm.get('password')?.clearValidators();
      this.technicianForm.get('password')?.updateValueAndValidity();
    }
  }

  loadTechnician() {
    if (this.technicianId) {
      this.loading = true;
      this.http.get<any>(`${environment.apiUrl}/users/${this.technicianId}`)
        .subscribe({
          next: (technician) => {
            this.technicianForm.patchValue({
              username: technician.username,
              email: technician.email,
              firstName: technician.firstName,
              lastName: technician.lastName
            });
            this.loading = false;
          },
          error: (err) => {
            this.error = 'Failed to load technician details';
            this.loading = false;
          }
        });
    }
  }

  onSubmit() {
    if (this.technicianForm.valid) {
      this.loading = true;
      this.error = null;

      const technicianData = {
        ...this.technicianForm.value,
        role: 'TECHNICIAN',
        active: true
      };

      if (this.isEditMode && this.technicianId) {
        // Remove password if not changed
        if (!technicianData.password) {
          delete technicianData.password;
        }
        
        this.http.put<any>(`${environment.apiUrl}/users/${this.technicianId}`, technicianData)
          .subscribe({
            next: () => {
              this.router.navigate(['/technicians']);
            },
            error: (err) => {
              this.error = err.error?.message || 'Failed to update technician';
              this.loading = false;
            }
          });
      } else {
        this.http.post<any>(`${environment.apiUrl}/users`, technicianData)
          .subscribe({
            next: () => {
              this.router.navigate(['/technicians']);
            },
            error: (err) => {
              this.error = err.error?.message || 'Failed to add technician';
              this.loading = false;
            }
          });
      }
    }
  }
} 