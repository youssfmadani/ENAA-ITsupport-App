import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-equipment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.scss']
})
export class EquipmentFormComponent implements OnInit {
  equipmentForm: FormGroup;
  isEditMode = false;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.equipmentForm = this.fb.group({
      name: ['', Validators.required],
      serialNumber: ['', Validators.required],
      type: ['', Validators.required],
      status: ['AVAILABLE', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadEquipment(id);
    }
  }

  loadEquipment(id: string): void {
    this.loading = true;
    this.http.get<any>(`http://localhost:8080/api/equipment/${id}`)
      .subscribe({
        next: (data) => {
          this.equipmentForm.patchValue(data);
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to load equipment';
          this.loading = false;
          console.error('Error loading equipment:', error);
        }
      });
  }

  onSubmit(): void {
    if (this.equipmentForm.invalid) {
      return;
    }

    this.loading = true;
    const equipment = this.equipmentForm.value;

    if (this.isEditMode) {
      const id = this.route.snapshot.paramMap.get('id');
      this.http.put(`http://localhost:8080/api/equipment/${id}`, equipment)
        .subscribe({
          next: () => {
            this.router.navigate(['/equipment']);
          },
          error: (error) => {
            this.error = 'Failed to update equipment';
            this.loading = false;
            console.error('Error updating equipment:', error);
          }
        });
    } else {
      this.http.post('http://localhost:8080/api/equipment', equipment)
        .subscribe({
          next: () => {
            this.router.navigate(['/equipment']);
          },
          error: (error) => {
            this.error = 'Failed to create equipment';
            this.loading = false;
            console.error('Error creating equipment:', error);
          }
        });
    }
  }
} 