import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">
              <h3 class="text-center">{{ isEditMode ? 'Edit' : 'Create' }} Ticket</h3>
            </div>
            <div class="card-body">
              <form [formGroup]="ticketForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label for="title" class="form-label">Title</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    formControlName="title"
                    [ngClass]="{'is-invalid': ticketForm.get('title')?.invalid && ticketForm.get('title')?.touched}"
                    placeholder="Enter ticket title"
                  >
                  <div class="invalid-feedback" *ngIf="ticketForm.get('title')?.invalid && ticketForm.get('title')?.touched">
                    Title is required
                  </div>
                </div>

                <div class="mb-3">
                  <label for="description" class="form-label">Description</label>
                  <textarea
                    class="form-control"
                    id="description"
                    formControlName="description"
                    rows="4"
                    [ngClass]="{'is-invalid': ticketForm.get('description')?.invalid && ticketForm.get('description')?.touched}"
                    placeholder="Enter ticket description"
                  ></textarea>
                  <div class="invalid-feedback" *ngIf="ticketForm.get('description')?.invalid && ticketForm.get('description')?.touched">
                    Description is required
                  </div>
                </div>

                <div class="mb-3">
                  <label for="priority" class="form-label">Priority</label>
                  <select
                    class="form-select"
                    id="priority"
                    formControlName="priority"
                    [ngClass]="{'is-invalid': ticketForm.get('priority')?.invalid && ticketForm.get('priority')?.touched}"
                  >
                    <option value="">Select priority</option>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                  <div class="invalid-feedback" *ngIf="ticketForm.get('priority')?.invalid && ticketForm.get('priority')?.touched">
                    Priority is required
                  </div>
                </div>

                <div class="mb-3">
                  <label for="status" class="form-label">Status</label>
                  <select
                    class="form-select"
                    id="status"
                    formControlName="status"
                    [ngClass]="{'is-invalid': ticketForm.get('status')?.invalid && ticketForm.get('status')?.touched}"
                  >
                    <option value="">Select status</option>
                    <option value="OPEN">Open</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="RESOLVED">Resolved</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                  <div class="invalid-feedback" *ngIf="ticketForm.get('status')?.invalid && ticketForm.get('status')?.touched">
                    Status is required
                  </div>
                </div>

                <div class="mb-3">
                  <label for="technician" class="form-label">Assign Technician</label>
                  <select
                    class="form-select"
                    id="technician"
                    formControlName="technicianId"
                  >
                    <option value="">Select technician</option>
                    <option *ngFor="let tech of technicians" [value]="tech.id">
                      {{ tech.firstName }} {{ tech.lastName }}
                    </option>
                  </select>
                </div>

                <div class="alert alert-danger" *ngIf="error">
                  {{ error }}
                </div>

                <div class="d-grid gap-2">
                  <button 
                    type="submit" 
                    class="btn btn-primary btn-lg" 
                    [disabled]="ticketForm.invalid || loading"
                    [class.btn-loading]="loading"
                  >
                    <span *ngIf="!loading">{{ isEditMode ? 'Update' : 'Create' }} Ticket</span>
                    <span *ngIf="loading">
                      <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      {{ isEditMode ? 'Updating...' : 'Creating...' }}
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
    .form-control, .form-select {
      padding: 0.75rem 1rem;
      border-radius: 6px;
    }
    .form-control:focus, .form-select:focus {
      box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.15);
    }
    .invalid-feedback {
      font-size: 0.875rem;
    }
  `]
})
export class TicketFormComponent implements OnInit {
  ticketForm: FormGroup;
  loading = false;
  error: string | null = null;
  isEditMode = false;
  ticketId: number | null = null;
  technicians: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['OPEN', Validators.required],
      technicianId: ['']
    });
  }

  ngOnInit() {
    this.loadTechnicians();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.ticketId = +id;
      this.loadTicket();
    }
  }

  loadTechnicians() {
    this.http.get<any[]>(`${environment.apiUrl}/users/role/TECHNICIAN`)
      .subscribe({
        next: (technicians) => {
          this.technicians = technicians.filter(tech => tech.active);
        },
        error: (err) => {
          this.error = 'Failed to load technicians';
        }
      });
  }

  loadTicket() {
    if (this.ticketId) {
      this.loading = true;
      this.http.get<any>(`${environment.apiUrl}/tickets/${this.ticketId}`)
        .subscribe({
          next: (ticket) => {
            this.ticketForm.patchValue({
              title: ticket.title,
              description: ticket.description,
              priority: ticket.priority,
              status: ticket.status,
              technicianId: ticket.technician?.id || ''
            });
            this.loading = false;
          },
          error: (err) => {
            this.error = 'Failed to load ticket details';
            this.loading = false;
          }
        });
    }
  }

  onSubmit() {
    if (this.ticketForm.valid) {
      this.loading = true;
      this.error = null;

      const ticketData = this.ticketForm.value;

      if (this.isEditMode && this.ticketId) {
        this.http.put<any>(`${environment.apiUrl}/tickets/${this.ticketId}`, ticketData)
          .subscribe({
            next: () => {
              this.router.navigate(['/tickets']);
            },
            error: (err) => {
              this.error = err.error?.message || 'Failed to update ticket';
              this.loading = false;
            }
          });
      } else {
        this.http.post<any>(`${environment.apiUrl}/tickets`, ticketData)
          .subscribe({
            next: () => {
              this.router.navigate(['/tickets']);
            },
            error: (err) => {
              this.error = err.error?.message || 'Failed to create ticket';
              this.loading = false;
            }
          });
      }
    }
  }
} 