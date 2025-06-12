import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Issue } from '../../models/issue.model';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css'],
  imports: [CommonModule, RouterModule],
  standalone: true
})
export class IssueListComponent implements OnInit {
  issues: Issue[] = [];
  loading = false;
  error = '';

  constructor(private issueService: IssueService) { }

  ngOnInit(): void {
    this.loadIssues();
  }

  loadIssues(): void {
    this.loading = true;
    this.issueService.getAllIssues()
      .subscribe({
        next: (data) => {
          this.issues = data;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Error loading issues';
          this.loading = false;
          console.error('Error:', error);
        }
      });
  }

  deleteIssue(id: number): void {
    if (confirm('Are you sure you want to delete this issue?')) {
      this.issueService.deleteIssue(id)
        .subscribe({
          next: () => {
            this.issues = this.issues.filter(i => i.id !== id);
          },
          error: (error) => {
            this.error = 'Error deleting issue';
            console.error('Error:', error);
          }
        });
    }
  }
} 