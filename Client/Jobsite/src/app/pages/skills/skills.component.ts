import { Component,OnInit } from '@angular/core';
import { UserSkillService } from '../../services/user-skill.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobSkillService } from '../../services/job-skill.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-skills',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit {
  skills: any[] = [];
  userId: string | undefined;

  constructor (private userSkillService: UserSkillService, jobSkillService:JobSkillService,
    private http:HttpClient, private authService:AuthService
  ) {}
  ngOnInit(): void {
   this.userId = this.authService.getUserId();
   this.loadSkills();
  }

  
  loadSkills() {
    this.http.get<any[]>(`http://54.197.174.28:3000/api/v1/skills`).subscribe({
      next: (res) => {
        this.skills = res;
      },
      error: (err) => {
        console.error('Error fetching skills:', err);
      },
    });
  }

  addSkill(skillId: number, yearsExperience: number) {
    if (yearsExperience == null || yearsExperience < 0) {
      alert('Please enter a valid number of years of experience.');
      return;
    }
    this.userSkillService.createUserSkill({
      userId: this.userId ? parseInt(this.userId, 10) : 0,
      skillId,
      yearsExperience,
    }).subscribe({
      next: (res) => {
        //console.log('Skill added:', res);
        alert('Skill successfully added!');
      },
      error: (err) => {
        console.error(err);
        alert('Failed to add skill.');
      }
    });
  }
   



}
