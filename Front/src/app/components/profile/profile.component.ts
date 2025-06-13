import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  loading = false;
  error: string | null = null;
  success: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      currentPassword: [''],
      newPassword: [''],
      confirmPassword: ['']
    });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    return new HttpHeaders().set('Authorization', token);
  }

  loadProfile(): void {
    this.loading = true;
    this.http.get<any>(`${environment.apiUrl}/auth/profile`, { headers: this.getAuthHeaders() })
      .subscribe({
        next: (data) => {
          this.profileForm.patchValue({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email
          });
          this.loading = false;
        },
        error: (error) => {
          this.error = error.error?.message || 'Failed to load profile';
          this.loading = false;
          console.error('Error loading profile:', error);
        }
      });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = null;
    this.success = null;

    const formData = this.profileForm.value;
    if (!formData.currentPassword) {
      delete formData.currentPassword;
      delete formData.newPassword;
      delete formData.confirmPassword;
    }

    this.http.put(`${environment.apiUrl}/auth/profile`, formData, { headers: this.getAuthHeaders() })
      .subscribe({
        next: () => {
          this.success = 'Profile updated successfully';
          this.loading = false;
          this.profileForm.patchValue({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          });
        },
        error: (error) => {
          this.error = error.error?.message || 'Failed to update profile';
          this.loading = false;
          console.error('Error updating profile:', error);
        }
      });
  }
} 