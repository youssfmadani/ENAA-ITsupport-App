import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-equipment-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss']
})
export class EquipmentListComponent implements OnInit {
  equipments: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadEquipments();
  }

  loadEquipments(): void {
    this.loading = true;
    this.http.get<any[]>('http://localhost:8080/api/equipment')
      .subscribe({
        next: (data) => {
          this.equipments = data;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to load equipment list';
          this.loading = false;
          console.error('Error loading equipment:', error);
        }
      });
  }

  deleteEquipment(id: number): void {
    if (confirm('Are you sure you want to delete this equipment?')) {
      this.http.delete(`http://localhost:8080/api/equipment/${id}`)
        .subscribe({
          next: () => {
            this.equipments = this.equipments.filter(e => e.id !== id);
          },
          error: (error) => {
            this.error = 'Failed to delete equipment';
            console.error('Error deleting equipment:', error);
          }
        });
    }
  }
} 