import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  unreadCount = 0;
  currentUser: any = null;
  isBusinessOrCreator = false;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.currentUser = JSON.parse(userStr);
      this.isBusinessOrCreator = this.currentUser.accountType === 'BUSINESS' || this.currentUser.accountType === 'CREATOR';
      console.log('Current User:', this.currentUser);
      console.log('Account Type:', this.currentUser.accountType);
      console.log('Is Business or Creator:', this.isBusinessOrCreator);
    } else {
      console.log('No user found in localStorage');
    }
    this.loadUnreadCount();
    setInterval(() => this.loadUnreadCount(), 30000);
  }

  loadUnreadCount() {
    this.notificationService.getUnreadCount().subscribe({
      next: (count) => this.unreadCount = count,
      error: () => {}
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
