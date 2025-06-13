import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary" *ngIf="isLoggedIn">
      <div class="container">
        <a class="navbar-brand" routerLink="/">IT Support System</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/equipment" routerLinkActive="active">Equipment</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/tickets" routerLinkActive="active">Tickets</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/reports" routerLinkActive="active">Reports</a>
            </li>
            <li class="nav-item" *ngIf="isAdmin">
              <a class="nav-link" routerLink="/technicians" routerLinkActive="active">Technicians</a>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" routerLink="/profile" routerLinkActive="active">Profile</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" (click)="logout()" style="cursor: pointer;">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="container py-4">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .navbar {
      margin-bottom: 1rem;
    }
  `]
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.checkAuthStatus();
  }

  checkAuthStatus() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      this.isLoggedIn = true;
      const userData = JSON.parse(user);
      this.isAdmin = userData.role === 'ADMIN';
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.isAdmin = false;
    window.location.href = '/login';
  }
} 