import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface ResultItem {
  id: string;
  name?: string;
  email?: string;
  skills?: string[];
  title?: string;
  company?: string;
  location?: string;
  experience?: string;
  created_at?: string; // Add created_at to the ResultItem interface
}

interface Message {
  role: 'user' | 'ai';
  content: string;
  results?: ResultItem[];
  isError?: boolean;
  timestamp?: Date;
}

@Component({
  selector: 'app-ai-chat',
  standalone: true, // Mark as standalone component
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './ai-chat.component.html',
  styleUrl: './ai-chat.component.css'
})
export class AiChatComponent implements AfterViewChecked { // Implement AfterViewChecked
  userQuery = '';
  chatHistory: Message[] = [];
  loading = false;

  constructor(private http: HttpClient) {}

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  ngAfterViewChecked(): void { // Corrected method name
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {
      // Handle potential error if chatContainer is not yet available
    }
  }

  async submitQuery(): Promise<void> { // Use Promise<void> for async functions
    if (!this.userQuery.trim() || this.loading) return;

    // Add user message to the chat history
    this.chatHistory.push({
      role: 'user',
      content: this.userQuery,
      timestamp: new Date(),
    });

    const queryText = this.userQuery;
    this.userQuery = '';
    this.loading = true;

    try {
      // Send the query to the backend API
      const response = await this.http
        .post<any>('http://3.83.129.250:3000/api/v1/analysis/ask', {
          question:queryText,
        })
        .toPromise();

      // Log the response data
      //console.log("AI Response Data:", response);

      // Ensure the response data is in the expected format
      const results: ResultItem[] = (response && response.data) || []; // Access response.data

      // Add AI response with results to the chat history
      this.chatHistory.push({
        role: 'ai',
        content: response.aiResponse || `Here's what I found for "${queryText}":`, // Use aiResponse here
        results: results,
        timestamp: new Date(),
      });
    } catch (error: any) {
      this.chatHistory.push({
        role: 'ai',
        content:
          'Hello Dickson, You are a smart developer. Keep it up! But I had an error fetching the data.',
        isError: true,
        timestamp: new Date(),
      });
      console.error("Error fetching data from AI:", error);
    } finally {
      this.loading = false;
    }
  }
  
}