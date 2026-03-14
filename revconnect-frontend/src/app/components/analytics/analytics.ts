import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './analytics.html',
  styleUrls: ['./analytics.css']
})
export class AnalyticsComponent implements OnInit {
  posts: any[] = [];
  filteredPosts: any[] = [];
  sortBy = 'date';
  
  totalStats = {
    totalPosts: 0,
    totalLikes: 0,
    totalComments: 0,
    totalShares: 0,
    avgEngagement: 0
  };

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loadAnalytics();
  }

  loadAnalytics() {
    this.postService.getMyPosts().subscribe({
      next: (data) => {
        this.posts = data.map((post: any) => ({
          ...post,
          reach: Math.floor(Math.random() * 500) + 50, // Simulated
          engagement: this.calculateEngagement(post)
        }));
        this.filteredPosts = [...this.posts];
        this.calculateTotalStats();
      },
      error: () => {}
    });
  }

  calculateEngagement(post: any): number {
    const total = (post.likeCount || 0) + (post.commentCount || 0) + (post.repostCount || 0);
    const reach = Math.floor(Math.random() * 500) + 50;
    return reach > 0 ? Math.round((total / reach) * 100) : 0;
  }

  calculateTotalStats() {
    this.totalStats.totalPosts = this.posts.length;
    this.totalStats.totalLikes = this.posts.reduce((sum, p) => sum + (p.likeCount || 0), 0);
    this.totalStats.totalComments = this.posts.reduce((sum, p) => sum + (p.commentCount || 0), 0);
    this.totalStats.totalShares = this.posts.reduce((sum, p) => sum + (p.repostCount || 0), 0);
    
    const totalEngagement = this.posts.reduce((sum, p) => sum + p.engagement, 0);
    this.totalStats.avgEngagement = this.posts.length > 0 
      ? Math.round(totalEngagement / this.posts.length) 
      : 0;
  }

  sortPosts() {
    if (this.sortBy === 'date') {
      this.filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (this.sortBy === 'likes') {
      this.filteredPosts.sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0));
    } else if (this.sortBy === 'engagement') {
      this.filteredPosts.sort((a, b) => b.engagement - a.engagement);
    }
  }
}
