import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post';
import { LikeService } from '../../services/like';
import { CommentService } from '../../services/comment';
import { RepostService } from '../../services/repost';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feed.html',
  styleUrls: ['./feed.css']
})
export class FeedComponent implements OnInit {
  posts: any[] = [];
  currentUserId: number | null = null;
  likeMessage = '';

  constructor(
    private postService: PostService,
    private likeService: LikeService,
    private commentService: CommentService,
    private repostService: RepostService
  ) {}

  ngOnInit() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.currentUserId = user.id;
    }
    this.loadFeed();
  }

  isMyComment(comment: any): boolean {
    return comment.user?.id === this.currentUserId;
  }

  loadFeed() {
    this.postService.getFeed().subscribe({
      next: (data) => {
        this.posts = data;
        // Initialize isLiked and isReposted to false for all posts
        this.posts.forEach(post => {
          if (post.isLiked === undefined) {
            post.isLiked = false;
          }
          if (post.isReposted === undefined) {
            post.isReposted = false;
          }
        });
      },
      error: () => {}
    });
  }

  toggleLike(post: any) {
    if (post.isLiked) {
      this.likeService.unlikePost(post.id).subscribe({
        next: () => {
          post.isLiked = false;
          post.likeCount = (post.likeCount || 0) - 1;
          this.showLikeMessage('Unliked!');
        },
        error: (err) => {
          console.error('Unlike error:', err);
        }
      });
    } else {
      this.likeService.likePost(post.id).subscribe({
        next: () => {
          post.isLiked = true;
          post.likeCount = (post.likeCount || 0) + 1;
          this.showLikeMessage('Liked!');
        },
        error: (err) => {
          console.error('Like error:', err);
        }
      });
    }
  }

  showLikeMessage(message: string) {
    this.likeMessage = message;
    setTimeout(() => this.likeMessage = '', 2000);
  }

  toggleComments(post: any) {
    post.showComments = !post.showComments;
    if (post.showComments && !post.comments) {
      this.commentService.getComments(post.id).subscribe({
        next: (data) => post.comments = data,
        error: () => {}
      });
    }
  }

  addComment(post: any) {
    if (!post.newComment) return;
    this.commentService.addComment(post.id, { content: post.newComment }).subscribe({
      next: (comment) => {
        if (!post.comments) post.comments = [];
        post.comments.push(comment);
        post.newComment = '';
        post.commentCount++;
      },
      error: () => {}
    });
  }

  deleteComment(post: any, comment: any) {
    this.commentService.deleteComment(comment.id).subscribe({
      next: () => {
        post.comments = post.comments.filter((c: any) => c.id !== comment.id);
        post.commentCount--;
      },
      error: () => {}
    });
  }

  repost(post: any) {
    if (post.isReposted) {
      // Already reposted, show message
      this.showLikeMessage('Already reposted!');
      return;
    }
    
    this.repostService.repostPost(post.id).subscribe({
      next: () => {
        post.isReposted = true;
        this.showLikeMessage('Reposted successfully!');
      },
      error: () => {
        this.showLikeMessage('Failed to repost');
      }
    });
  }

  getTimeAgo(dateString: string): string {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffMs = now.getTime() - postDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    const diffWeeks = Math.floor(diffMs / 604800000);
    const diffMonths = Math.floor(diffMs / 2592000000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffWeeks < 4) return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
    if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
    
    const diffYears = Math.floor(diffMonths / 12);
    return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
  }
}
