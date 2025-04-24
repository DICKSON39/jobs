import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CareerSuggestionsService } from '../../services/career-suggestions.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-aicareer-path',
  imports: [CommonModule,FormsModule],
  templateUrl: './aicareer-path.component.html',
  styleUrl: './aicareer-path.component.css'
})
export class AICareerPathComponent  implements OnInit{
  userId: number = 1;  // Replace with actual userId
  careerSuggestions: any[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;
 constructor (private authService:AuthService,private careerSuggestionsService:CareerSuggestionsService) {}

 getCareerSuggestions():void {
  const currentUser = this.authService.getCurrentUser()
  if (!currentUser || !currentUser.id) {
    this.errorMessage = 'User not logged in or user ID is missing.';
    return;
  }
  this.isLoading = true;
  this.careerSuggestionsService.getCareerSuggestions(currentUser.id)
  .subscribe(
    (response) => {
     this.careerSuggestions=response.suggestions || [];
     this.isLoading = false;
    },
    (error) => {
      this.errorMessage = 'Failed to fetch career suggestions';
      this.isLoading = false;
    }
  )
 }

 ngOnInit(): void {
     this.getCareerSuggestions();
 }
}
