import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post';
import { LikeService } from '../../services/like';
import { CommentService } from '../../services/comment';

@Component({
  selector: 'app-my-posts',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './my-posts.html',
  styleUrls: ['./my-posts.css']
})
export class MyPostsComponent implements OnInit {
  posts: any[] = [];
  successMessage = '';
  errorMessage = '';
  editingPostId: number | null = null;
  editData: any = {};

  constructor(
    private postService: PostService,
    private likeService: LikeService,
    private commentService: CommentService
  ) {}

  ngOnInit() {
    this.loadMyPosts();
  }

  loadMyPosts() {
    this.postService.getMyPosts().subscribe({
      next: (data) => this.posts = data,
      error: () => {}
    });
  }

  startEdit(post: any) {
    this.editingPostId = post.id;
    this.editData = { 
      content: post.content, 
      hashtags: post.hashtags 
    };
  }

  cancelEdit() {
    this.editingPostId = null;
    this.editData = {};
  }

  saveEdit(post: any) {
    this.postService.updatePost(post.id, this.editData).subscribe({
      next: (updatedPost) => {
        post.content = updatedPost.content;
        post.hashtags = updatedPost.hashtags;
        this.editingPostId = null;
        this.successMessage = 'Post updated successfully!';
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: () => {
        this.errorMessage = 'Failed to update post';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }

  deletePost(id: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(id).subscribe({
        next: () => {
          this.posts = this.posts.filter(p => p.id !== id);
          this.successMessage = 'Post deleted successfully!';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: () => {
          this.errorMessage = 'Failed to delete post';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    }
  }

  toggleLikes(post: any) {
    if (post.showLikes) {
      post.showLikes = false;
    } else {
      this.likeService.getLikesByPost(post.id).subscribe({
        next: (likes) => {
          post.likes = likes;
          post.showLikes = true;
        },
        error: () => {}
      });
    }
  }

  toggleComments(post: any) {
    if (post.showComments) {
      post.showComments = false;
    } else {
      this.commentService.getComments(post.id).subscribe({
        next: (comments) => {
          post.comments = comments;
          post.showComments = true;
        },
        error: () => {}
      });
    }
  }
}
