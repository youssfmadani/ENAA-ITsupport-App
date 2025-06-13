import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-equipment-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Equipment</h2>
        <button class="btn btn-primary" (click)="addEquipment()">Add Equipment</button>
      </div>

      <div class="row">
        <div class="col-md-4 mb-4" *ngFor="let equipment of equipmentList">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">{{ equipment.name }}</h5>
              <p class="card-text">
                <strong>Type:</strong> {{ equipment.type }}<br>
                <strong>Status:</strong> {{ equipment.status }}<br>
                <strong>Location:</strong> {{ equipment.location }}
              </p>
            </div>
            <div class="card-footer">
              <button class="btn btn-sm btn-primary me-2" (click)="editEquipment(equipment)">Edit</button>
              <button class="btn btn-sm btn-danger" (click)="deleteEquipment(equipment)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s;
    }
    .card:hover {
      transform: translateY(-5px);
    }
  `]
})
export class EquipmentListComponent implements OnInit {
  equipmentList: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadEquipment();
  }

  loadEquipment() {
    this.http.get<any[]>(`${environment.apiUrl}/equipment`)
      .subscribe({
        next: (data) => {
          this.equipmentList = data;
        },
        error: (error) => {
          console.error('Error loading equipment:', error);
        }
      });
  }

  addEquipment() {
    this.router.navigate(['/equipment/add']);
  }

  editEquipment(equipment: any) {
    this.router.navigate(['/equipment/edit', equipment.id]);
  }

  deleteEquipment(equipment: any) {
    if (confirm('Are you sure you want to delete this equipment?')) {
      this.http.delete(`${environment.apiUrl}/equipment/${equipment.id}`)
        .subscribe({
          next: () => {
            this.loadEquipment();
          },
          error: (error) => {
            console.error('Error deleting equipment:', error);
          }
        });
    }
  }
} 