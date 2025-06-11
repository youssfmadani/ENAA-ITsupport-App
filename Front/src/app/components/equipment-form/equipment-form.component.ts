import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipment } from '../../models/equipment.model';
import { EquipmentService } from '../../services/equipment.service';

@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.css']
})
export class EquipmentFormComponent implements OnInit {
  equipmentForm: FormGroup;
  isEditMode = false;
  equipmentId: number | null = null;
  loading = false;
  error = '';

  equipmentTypes = [
    'COMPUTER',
    'LAPTOP',
    'PRINTER',
    'SERVER',
    'NETWORK_DEVICE',
    'PERIPHERAL',
    'OTHER'
  ];

  equipmentStatuses = [
    'OPERATIONAL',
    'MAINTENANCE',
    'OUT_OF_SERVICE'
  ];

  constructor(
    private fb: FormBuilder,
    private equipmentService: EquipmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.equipmentForm = this.fb.group({
      name: ['', Validators.required],
      serialNumber: ['', Validators.required],
      type: ['', Validators.required],
      status: ['OPERATIONAL', Validators.required],
      purchaseDate: ['', Validators.required],
      manufacturer: ['', Validators.required],
      model: ['', Validators.required],
      location: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.equipmentId = +id;
      this.loadEquipment(this.equipmentId);
    }
  }

  loadEquipment(id: number): void {
    this.loading = true;
    this.equipmentService.getEquipmentById(id)
      .subscribe({
        next: (equipment) => {
          this.equipmentForm.patchValue({
            ...equipment,
            purchaseDate: equipment.purchaseDate?.split('T')[0]
          });
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Error loading equipment';
          this.loading = false;
          console.error('Error:', error);
        }
      });
  }

  onSubmit(): void {
    if (this.equipmentForm.valid) {
      this.loading = true;
      const equipment: Equipment = this.equipmentForm.value;

      const request = this.isEditMode && this.equipmentId
        ? this.equipmentService.updateEquipment(this.equipmentId, equipment)
        : this.equipmentService.createEquipment(equipment);

      request.subscribe({
        next: () => {
          this.router.navigate(['/equipment']);
        },
        error: (error) => {
          this.error = 'Error saving equipment';
          this.loading = false;
          console.error('Error:', error);
        }
      });
    }
  }
} 