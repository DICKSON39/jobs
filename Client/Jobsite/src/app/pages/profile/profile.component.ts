import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CvService } from '../../services/cv.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userId!: number;
  userName!: string;
  cvs: any[] = [];
  skills: any[] = []

  constructor(private route:ActivatedRoute,private userProfileService:CvService) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    this.userProfileService.getUserInfo(this.userId).subscribe(data => {
      this.userName = data.userName;
      this.cvs = data.cvs;
      this.skills = data.skills
    })
  }


};
