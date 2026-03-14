import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../services/post';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-post.html',
  styleUrls: ['./create-post.css']
})
export class CreatePostComponent {
  postData = { content: '', hashtags: '' };
  successMessage = '';
  errorMessage = '';

  constructor(private postService: PostService, private router: Router) {}

  createPost() {
    this.postService.createPost(this.postData).subscribe({
      next: () => {
        this.successMessage = 'Post created successfully!';
        this.postData = { content: '', hashtags: '' };
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: () => {
        this.errorMessage = 'Failed to create post. Please try again.';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    });
  }
}
