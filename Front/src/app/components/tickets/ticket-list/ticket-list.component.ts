import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Tickets</h2>
        <button class="btn btn-primary" routerLink="/tickets/new">
          <i class="bi bi-plus-lg me-2"></i>New Ticket
        </button>
      </div>

      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Technician</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngIf="loading">
                  <td colspan="6" class="text-center">
                    <div class="spinner-border text-primary" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
                <tr *ngIf="!loading && tickets.length === 0">
                  <td colspan="6" class="text-center">No tickets found</td>
                </tr>
                <tr *ngFor="let ticket of tickets">
                  <td>{{ ticket.title }}</td>
                  <td>
                    <span class="badge" [ngClass]="{
                      'bg-success': ticket.status === 'RESOLVED',
                      'bg-warning': ticket.status === 'IN_PROGRESS',
                      'bg-danger': ticket.status === 'URGENT',
                      'bg-info': ticket.status === 'OPEN'
                    }">
                      {{ ticket.status }}
                    </span>
                  </td>
                  <td>
                    <span class="badge" [ngClass]="{
                      'bg-success': ticket.priority === 'LOW',
                      'bg-warning': ticket.priority === 'MEDIUM',
                      'bg-danger': ticket.priority === 'HIGH' || ticket.priority === 'URGENT',
                      'bg-urgent': ticket.priority === 'URGENT'
                    }">
                      {{ ticket.priority }}
                    </span>
                  </td>
                  <td>
                    {{ ticket.technician ? ticket.technician.firstName + ' ' + ticket.technician.lastName : 'Unassigned' }}
                  </td>
                  <td>{{ ticket.createdAt | date:'medium' }}</td>
                  <td>
                    <div class="btn-group">
                      <button class="btn btn-sm btn-outline-primary" [routerLink]="['/tickets', ticket.id, 'edit']">
                        <i class="bi bi-pencil"></i>
                      </button>
                      <button class="btn btn-sm btn-outline-danger" (click)="deleteTicket(ticket.id)">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .badge {
      padding: 0.5em 0.75em;
      font-weight: 500;
    }
    .btn-group {
      gap: 0.5rem;
    }
    .table th {
      font-weight: 600;
      background-color: #f8f9fa;
    }
    .table td {
      vertical-align: middle;
    }
    .bg-urgent {
      background-color: #dc3545;
      color: white;
    }
  `]
})
export class TicketListComponent implements OnInit {
  tickets: any[] = [];
  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets() {
    this.loading = true;
    this.http.get<any[]>(`${environment.apiUrl}/tickets`)
      .subscribe({
        next: (tickets) => {
          this.tickets = tickets;
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to load tickets:', err);
          this.loading = false;
        }
      });
  }

  deleteTicket(id: number) {
    if (confirm('Are you sure you want to delete this ticket?')) {
      this.http.delete(`${environment.apiUrl}/tickets/${id}`)
        .subscribe({
          next: () => {
            this.tickets = this.tickets.filter(ticket => ticket.id !== id);
          },
          error: (err) => {
            console.error('Failed to delete ticket:', err);
          }
        });
    }
  }
} 