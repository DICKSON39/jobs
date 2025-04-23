import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-jobs-available',
  imports: [CommonModule, RouterLink,FormsModule],
  templateUrl: './jobs-available.component.html',
  styleUrl: './jobs-available.component.css',
})
export class JobsAvailableComponent implements OnInit {
  jobs: any[] = [];
  filteredJobs: any[] = [];
  searchTerm: string = '';
  sortOption: string = '';

  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.jobService.getAllJobs().subscribe(
      (data) => {
        this.jobs = data;
        this.filteredJobs = [...this.jobs]; // ✅ Initialize filteredJobs
      },
      (error) => {
        console.error(`Error fetching jobs`, error);
      }
    );
  }

  filterJobs() {
    const term = this.searchTerm.toLowerCase();
    this.filteredJobs = this.jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term)
    );
    this.sortJobs(); // Apply sort after filter
  }

  sortJobs() {
    if (this.sortOption === 'title') {
      this.filteredJobs.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.sortOption === 'company') {
      this.filteredJobs.sort((a, b) => a.company.localeCompare(b.company));
    }
  }
}
