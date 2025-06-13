import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class TicketListComponent implements OnInit {
  tickets: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets() {
    this.loading = true;
    this.http.get<any[]>(`${environment.apiUrl}/tickets`)
      .subscribe({
        next: (data) => {
          this.tickets = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load tickets';
          this.loading = false;
          console.error('Error loading tickets:', err);
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
            this.error = 'Failed to delete ticket';
            console.error('Error deleting ticket:', err);
          }
        });
    }
  }
} 