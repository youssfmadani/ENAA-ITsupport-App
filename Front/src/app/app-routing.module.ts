import { provideRouter, Routes } from '@angular/router';
import { EquipmentListComponent } from './components/equipment-list/equipment-list.component';
import { EquipmentFormComponent } from './components/equipment-form/equipment-form.component';
import { IssueListComponent } from './components/issue-list/issue-list.component';
import { IssueFormComponent } from './components/issue-form/issue-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/equipment', pathMatch: 'full' },
  { path: 'equipment', component: EquipmentListComponent },
  { path: 'equipment/new', component: EquipmentFormComponent },
  { path: 'equipment/edit/:id', component: EquipmentFormComponent },
  { path: 'issues', component: IssueListComponent },
  { path: 'issues/new', component: IssueFormComponent },
  { path: 'issues/edit/:id', component: IssueFormComponent }
];

export const appRouting = [
  provideRouter(routes)
]; 