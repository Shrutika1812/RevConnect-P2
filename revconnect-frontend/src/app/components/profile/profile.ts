import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {
  profile: any = null;
  isEditing = false;
  editData: any = {};
  successMessage = '';
  errorMessage = '';

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.profileService.getMyProfile().subscribe({
      next: (data) => {
        this.profile = data;
        // If profile doesn't have an id, it means it doesn't exist yet
        if (!data || !data.id) {
          this.isEditing = true;
          this.editData = {};
        } else {
          this.editData = { ...data };
        }
      },
      error: (err) => {
        // Profile doesn't exist, show create form
        this.profile = { user: { email: '' } };
        this.isEditing = true;
        this.editData = {};
      }
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.editData = { ...this.profile };
    }
  }

  saveProfile() {
    if (this.profile && this.profile.id) {
      this.profileService.updateProfile(this.editData).subscribe({
        next: (data) => {
          this.profile = data;
          this.isEditing = false;
          this.successMessage = 'Profile updated successfully!';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: () => {
          this.errorMessage = 'Failed to update profile';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    } else {
      this.profileService.createProfile(this.editData).subscribe({
        next: (data) => {
          this.profile = data;
          this.isEditing = false;
          this.successMessage = 'Profile created successfully!';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: () => {
          this.errorMessage = 'Failed to create profile';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    }
  }

  deleteProfile() {
    if (confirm('Are you sure you want to delete your profile?')) {
      this.profileService.deleteProfile().subscribe({
        next: () => {
          this.profile = null;
          this.successMessage = 'Profile deleted successfully!';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: () => {
          this.errorMessage = 'Failed to delete profile';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    }
  }
}
