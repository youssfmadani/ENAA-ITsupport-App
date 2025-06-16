import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-technician-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Technicians</h2>
        <button class="btn btn-primary" routerLink="/technicians/new">Add New Technician</button>
      </div>

      <div *ngIf="loading" class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div *ngIf="error" class="alert alert-danger">
        {{ error }}
      </div>

      <div class="table-responsive" *ngIf="!loading && !error">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let technician of technicians">
              <td>{{ technician.firstName }} {{ technician.lastName }}</td>
              <td>{{ technician.email }}</td>
              <td>
                <span class="badge" [ngClass]="{
                  'bg-success': technician.active,
                  'bg-danger': !technician.active
                }">
                  {{ technician.active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td>
                <button class="btn btn-sm btn-primary me-2" [routerLink]="['/technicians/edit', technician.id]">
                  Edit
                </button>
                <button class="btn btn-sm" 
                  [ngClass]="technician.active ? 'btn-danger' : 'btn-success'"
                  (click)="toggleTechnicianStatus(technician)">
                  {{ technician.active ? 'Deactivate' : 'Activate' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div *ngIf="!loading && technicians.length === 0" class="alert alert-info">
        No technicians found.
      </div>
    </div>
  `,
  styles: [`
    .badge {
      font-size: 0.875rem;
      padding: 0.5em 0.75em;
    }
  `]
})
export class TechnicianListComponent implements OnInit {
  technicians: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTechnicians();
  }

  loadTechnicians(): void {
    this.loading = true;
    this.http.get<any[]>(`${environment.apiUrl}/users/role/TECHNICIAN`)
      .subscribe({
        next: (data) => {
          this.technicians = data;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to load technicians';
          this.loading = false;
          console.error('Error loading technicians:', error);
        }
      });
  }

  toggleTechnicianStatus(technician: any): void {
    const action = technician.active ? 'deactivate' : 'activate';
    if (confirm(`Are you sure you want to ${action} this technician?`)) {
      const url = `${environment.apiUrl}/users/${technician.id}/${action}`;
      this.http.put<any>(url, {})
        .subscribe({
          next: () => {
            technician.active = !technician.active;
          },
          error: (error) => {
            this.error = `Failed to ${action} technician`;
            console.error(`Error ${action}ing technician:`, error);
          }
        });
    }
  }
} 