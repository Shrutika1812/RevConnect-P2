import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../services/profile';
import { PostService } from '../../services/post';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css']
})
export class UserProfileComponent implements OnInit {
  userId: number | null = null;
  profile: any = null;
  posts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.loadUserProfile();
      this.loadUserPosts();
    });
  }

  loadUserProfile() {
    if (!this.userId) return;
    this.profileService.getUserProfile(this.userId).subscribe({
      next: (data) => {
        this.profile = data;
        // If profile doesn't exist, create a basic one with user info
        if (!this.profile || !this.profile.id) {
          this.profile = {
            user: { username: 'User', email: '' },
            name: 'User',
            bio: 'No profile yet'
          };
        }
      },
      error: () => {
        // If error, show basic info
        this.profile = {
          user: { username: 'User', email: '' },
          name: 'User',
          bio: 'Profile not found'
        };
      }
    });
  }

  loadUserPosts() {
    // For now, we'll show empty - you can add getUserPosts API later
    this.posts = [];
  }
}
