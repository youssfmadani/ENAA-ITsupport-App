import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Issue } from '../models/issue.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private apiUrl = `${environment.apiUrl}/issues`;

  constructor(private http: HttpClient) { }

  getAllIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.apiUrl);
  }

  getIssueById(id: number): Observable<Issue> {
    return this.http.get<Issue>(`${this.apiUrl}/${id}`);
  }

  createIssue(issue: Issue): Observable<Issue> {
    return this.http.post<Issue>(this.apiUrl, issue);
  }

  updateIssue(id: number, issue: Issue): Observable<Issue> {
    return this.http.put<Issue>(`${this.apiUrl}/${id}`, issue);
  }

  deleteIssue(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getIssuesByEquipment(equipmentId: number): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${this.apiUrl}/equipment/${equipmentId}`);
  }

  getIssuesByStatus(status: string): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${this.apiUrl}/status/${status}`);
  }

  getIssuesByTechnician(technicianId: number): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${this.apiUrl}/technician/${technicianId}`);
  }
} 