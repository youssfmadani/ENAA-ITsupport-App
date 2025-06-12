import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Issue } from '../../models/issue.model';
import { Equipment } from '../../models/equipment.model';
import { User } from '../../models/user.model';
import { IssueService } from '../../services/issue.service';
import { EquipmentService } from '../../services/equipment.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true
})
export class IssueFormComponent implements OnInit {
  issueForm: FormGroup;
  isEditMode = false;
  issueId: number | null = null;
  loading = false;
  error = '';
  equipments: Equipment[] = [];
  technicians: User[] = [];

  severityLevels = ['LOW', 'MEDIUM', 'HIGH'];
  statusOptions = ['OPEN', 'IN_PROGRESS', 'RESOLVED'];

  constructor(
    private fb: FormBuilder,
    private issueService: IssueService,
    private equipmentService: EquipmentService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.issueForm = this.fb.group({
      description: ['', Validators.required],
      severity: ['MEDIUM', Validators.required],
      status: ['OPEN', Validators.required],
      resolution: [''],
      equipmentId: ['', Validators.required],
      technicianId: ['']
    });
  }

  ngOnInit(): void {
    this.loadEquipments();
    this.loadTechnicians();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.issueId = +id;
      this.loadIssue(this.issueId);
    }
  }

  loadEquipments(): void {
    this.equipmentService.getAllEquipment()
      .subscribe({
        next: (data) => {
          this.equipments = data;
        },
        error: (error) => {
          console.error('Error loading equipment:', error);
        }
      });
  }

  loadTechnicians(): void {
    this.userService.getUsersByRole('TECHNICIAN')
      .subscribe({
        next: (data) => {
          this.technicians = data;
        },
        error: (error) => {
          console.error('Error loading technicians:', error);
        }
      });
  }

  loadIssue(id: number): void {
    this.loading = true;
    this.issueService.getIssueById(id)
      .subscribe({
        next: (issue) => {
          this.issueForm.patchValue({
            description: issue.description,
            severity: issue.severity,
            status: issue.status,
            resolution: issue.resolution,
            equipmentId: issue.equipment?.id,
            technicianId: issue.technician?.id
          });
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Error loading issue';
          this.loading = false;
          console.error('Error:', error);
        }
      });
  }

  onSubmit(): void {
    if (this.issueForm.valid) {
      this.loading = true;
      const issueData = this.issueForm.value;

      const request = this.isEditMode && this.issueId
        ? this.issueService.updateIssue(this.issueId, issueData)
        : this.issueService.createIssue(issueData);

      request.subscribe({
        next: () => {
          this.router.navigate(['/issues']);
        },
        error: (error) => {
          this.error = 'Error saving issue';
          this.loading = false;
          console.error('Error:', error);
        }
      });
    }
  }
} 