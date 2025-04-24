import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cv-upload',
  imports: [CommonModule,FormsModule],
  templateUrl: './cv-upload.component.html',
  styleUrl: './cv-upload.component.css'
})
export class CvUploadComponent {
  selectedFile: File | null = null;
  fileName = '';
  userId = '';

  constructor (private http:HttpClient,private authService:AuthService) {this.userId = this.authService.getUserId()}
 
  onFileSelected(event:Event) {
   const input = event.target as HTMLInputElement;
   if(input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
    this.fileName = this.selectedFile.name
   }
  }

  uploadCv() {
    if(!this.selectedFile) {
      alert('please select a file first!')
      return;
    }
    const formData = new FormData();
    formData.append('file',this.selectedFile);
    formData.append('userId',this.userId);
    
    this.http.post<any>('http://3.83.129.250:3000/api/v1/cv/cvs', formData).subscribe({
      next: (response) => {
        //console.log('Upload successful:', response);
        alert('CV uploaded successfully!');
      },
      error: (error) => {
        console.error('Upload error:', error);
        alert('Error uploading CV.');
  }

})
  }
  }