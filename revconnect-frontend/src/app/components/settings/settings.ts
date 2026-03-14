import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { SettingsService } from '../../services/settings';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css']
})
export class SettingsComponent implements OnInit {
  activeTab = 'security';
  currentUser: any = null;
  
  // Password visibility toggles
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
  
  // Security
  passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  
  // Privacy
  privacySettings = {
    isPublic: true
  };
  
  // Notifications
  notificationPreferences = {
    connectionRequests: true,
    connectionAccepted: true,
    newFollowers: true,
    postLikes: true,
    postComments: true,
    postShares: true
  };
  
  successMessage = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.currentUser = JSON.parse(userStr);
    }
    this.loadSettings();
  }

  loadSettings() {
    if (this.currentUser) {
      this.settingsService.getSettings(this.currentUser.id).subscribe({
        next: (settings) => {
          this.privacySettings.isPublic = settings.isPublic;
          this.notificationPreferences = {
            connectionRequests: settings.notifyConnectionRequests,
            connectionAccepted: settings.notifyConnectionAccepted,
            newFollowers: settings.notifyNewFollowers,
            postLikes: settings.notifyPostLikes,
            postComments: settings.notifyPostComments,
            postShares: settings.notifyPostShares
          };
        },
        error: (err) => console.error('Error loading settings:', err)
      });
    }
  }

  changeTab(tab: string) {
    this.activeTab = tab;
    this.successMessage = '';
    this.errorMessage = '';
  }

  togglePasswordVisibility(field: string) {
    if (field === 'current') {
      this.showCurrentPassword = !this.showCurrentPassword;
    } else if (field === 'new') {
      this.showNewPassword = !this.showNewPassword;
    } else if (field === 'confirm') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  changePassword() {
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      this.errorMessage = 'New passwords do not match';
      setTimeout(() => this.errorMessage = '', 3000);
      return;
    }

    if (this.passwordData.newPassword.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      setTimeout(() => this.errorMessage = '', 3000);
      return;
    }

    this.settingsService.changePassword(
      this.currentUser.id,
      this.passwordData.currentPassword,
      this.passwordData.newPassword
    ).subscribe({
      next: (response) => {
        this.successMessage = 'Password changed successfully!';
        this.passwordData = { currentPassword: '', newPassword: '', confirmPassword: '' };
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Failed to change password';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }

  updatePrivacy() {
    this.settingsService.updatePrivacy(this.currentUser.id, this.privacySettings.isPublic).subscribe({
      next: () => {
        this.successMessage = 'Privacy settings updated!';
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        this.errorMessage = 'Failed to update privacy settings';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }

  updateNotifications() {
    this.settingsService.updateNotifications(this.currentUser.id, this.notificationPreferences).subscribe({
      next: () => {
        this.successMessage = 'Notification preferences updated!';
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        this.errorMessage = 'Failed to update notification preferences';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }

  deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Call backend API to delete account
      alert('Account deletion feature coming soon');
    }
  }
}
