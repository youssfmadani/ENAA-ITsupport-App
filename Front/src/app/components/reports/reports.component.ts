import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  loading = false;
  error: string | null = null;
  reports: any = {
    totalEquipment: 0,
    totalTickets: 0,
    openTickets: 0,
    closedTickets: 0,
    equipmentByStatus: {},
    ticketsByPriority: {}
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.loading = true;
    this.http.get<any>('http://localhost:8080/api/reports')
      .subscribe({
        next: (data) => {
          this.reports = data;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to load reports';
          this.loading = false;
          console.error('Error loading reports:', error);
        }
      });
  }
} 