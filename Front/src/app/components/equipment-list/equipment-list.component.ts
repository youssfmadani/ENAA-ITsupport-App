import { Component, OnInit } from '@angular/core';
import { Equipment } from '../../models/equipment.model';
import { EquipmentService } from '../../services/equipment.service';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {
  equipments: Equipment[] = [];
  loading = false;
  error = '';

  constructor(private equipmentService: EquipmentService) { }

  ngOnInit(): void {
    this.loadEquipments();
  }

  loadEquipments(): void {
    this.loading = true;
    this.equipmentService.getAllEquipment()
      .subscribe({
        next: (data) => {
          this.equipments = data;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Error loading equipment';
          this.loading = false;
          console.error('Error:', error);
        }
      });
  }

  deleteEquipment(id: number): void {
    if (confirm('Are you sure you want to delete this equipment?')) {
      this.equipmentService.deleteEquipment(id)
        .subscribe({
          next: () => {
            this.equipments = this.equipments.filter(e => e.id !== id);
          },
          error: (error) => {
            this.error = 'Error deleting equipment';
            console.error('Error:', error);
          }
        });
    }
  }
} 