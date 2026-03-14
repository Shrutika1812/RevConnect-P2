import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScheduledPostService } from '../../services/scheduled-post';

@Component({
  selector: 'app-scheduled-posts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scheduled-posts.html',
  styleUrls: ['./scheduled-posts.css']
})
export class ScheduledPostsComponent implements OnInit {
  scheduledPosts: any[] = [];
  showCreateForm = false;
  currentUser: any = null;
  
  newPost = {
    content: '',
    hashtags: '',
    scheduledDate: '',
    scheduledTime: ''
  };
  
  successMessage = '';
  errorMessage = '';

  constructor(private scheduledPostService: ScheduledPostService) {}

  ngOnInit() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.currentUser = JSON.parse(userStr);
    }
    this.loadScheduledPosts();
  }

  loadScheduledPosts() {
    if (this.currentUser) {
      this.scheduledPostService.getUserScheduledPosts(this.currentUser.id).subscribe({
        next: (posts) => {
          this.scheduledPosts = posts;
        },
        error: (err) => console.error('Error loading scheduled posts:', err)
      });
    }
  }

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
    if (!this.showCreateForm) {
      this.resetForm();
    }
  }

  schedulePost() {
    if (!this.newPost.content || !this.newPost.scheduledDate || !this.newPost.scheduledTime) {
      this.errorMessage = 'Please fill all required fields';
      setTimeout(() => this.errorMessage = '', 3000);
      return;
    }

    const scheduledDateTime = `${this.newPost.scheduledDate}T${this.newPost.scheduledTime}:00`;
    const scheduledDate = new Date(scheduledDateTime);
    
    if (scheduledDate <= new Date()) {
      this.errorMessage = 'Scheduled time must be in the future';
      setTimeout(() => this.errorMessage = '', 3000);
      return;
    }

    const data = {
      userId: this.currentUser.id,
      content: this.newPost.content,
      hashtags: this.newPost.hashtags,
      scheduledDateTime: scheduledDateTime
    };

    this.scheduledPostService.createScheduledPost(data).subscribe({
      next: () => {
        this.successMessage = 'Post scheduled successfully!';
        this.resetForm();
        this.showCreateForm = false;
        this.loadScheduledPosts();
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        this.errorMessage = 'Failed to schedule post';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }

  resetForm() {
    this.newPost = {
      content: '',
      hashtags: '',
      scheduledDate: '',
      scheduledTime: ''
    };
  }

  deleteScheduledPost(id: number) {
    if (confirm('Delete this scheduled post?')) {
      this.scheduledPostService.deleteScheduledPost(id, this.currentUser.id).subscribe({
        next: () => {
          this.successMessage = 'Scheduled post deleted';
          this.loadScheduledPosts();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => {
          this.errorMessage = 'Failed to delete scheduled post';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    }
  }

  getStatusClass(status: string): string {
    return status === 'pending' ? 'status-pending' : 'status-published';
  }
}
