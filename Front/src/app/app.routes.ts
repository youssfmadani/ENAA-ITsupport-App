import { Routes } from '@angular/router';
import { EquipmentListComponent } from './components/equipment/equipment-list/equipment-list.component';
import { EquipmentFormComponent } from './components/equipment-form/equipment-form.component';
import { TicketListComponent } from './components/tickets/ticket-list/ticket-list.component';
import { TicketFormComponent } from './components/ticket-form/ticket-form.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { TechnicianListComponent } from './components/technicians/technician-list/technician-list.component';
import { TechnicianFormComponent } from './components/technicians/technician-form/technician-form.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: EquipmentListComponent },
      { path: 'equipment', component: EquipmentListComponent },
      { path: 'equipment/add', component: EquipmentFormComponent },
      { path: 'equipment/new', component: EquipmentFormComponent },
      { path: 'equipment/edit/:id', component: EquipmentFormComponent },
      { path: 'tickets', component: TicketListComponent },
      { path: 'tickets/new', component: TicketFormComponent },
      { path: 'tickets/:id/edit', component: TicketFormComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'technicians', component: TechnicianListComponent },
      { path: 'technicians/new', component: TechnicianFormComponent },
      { path: 'technicians/:id/edit', component: TechnicianFormComponent }
    ]
  }
];
