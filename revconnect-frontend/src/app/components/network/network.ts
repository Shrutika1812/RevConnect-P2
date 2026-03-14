import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConnectionService } from '../../services/connection';
import { FollowService } from '../../services/follow';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-network',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './network.html',
  styleUrls: ['./network.css']
})
export class NetworkComponent implements OnInit {
  activeTab = 'connections';
  connections: any[] = [];
  pendingRequests: any[] = [];
  followers: any[] = [];
  following: any[] = [];
  searchResults: any[] = [];
  searchKeyword = '';
  currentUserId: number | null = null;

  constructor(
    private connectionService: ConnectionService,
    private followService: FollowService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.currentUserId = user.id;
    }
    this.loadConnections();
    this.loadPendingRequests();
    this.loadFollowers();
    this.loadFollowing();
  }

  getOtherUser(connection: any) {
    if (!this.currentUserId) return null;
    return connection.sender?.id === this.currentUserId ? connection.receiver : connection.sender;
  }

  loadConnections() {
    this.connectionService.getMyConnections().subscribe({
      next: (data) => {
        this.connections = data
          .filter((conn: any) => conn.status === 'ACCEPTED')
          .filter((conn: any) => {
            const otherUser = this.getOtherUser(conn);
            return otherUser && otherUser.id !== this.currentUserId;
          });
      },
      error: () => {}
    });
  }

  loadPendingRequests() {
    this.connectionService.getPendingRequests().subscribe({
      next: (data) => this.pendingRequests = data,
      error: () => {}
    });
  }

  loadFollowers() {
    this.followService.getFollowers().subscribe({
      next: (data) => this.followers = data,
      error: () => {}
    });
  }

  loadFollowing() {
    this.followService.getFollowing().subscribe({
      next: (data) => this.following = data,
      error: () => {}
    });
  }

  acceptRequest(id: number) {
    this.connectionService.acceptRequest(id).subscribe({
      next: () => {
        this.pendingRequests = this.pendingRequests.filter(r => r.id !== id);
        alert('Connection request accepted!');
        this.loadConnections();
      },
      error: () => alert('Failed to accept request')
    });
  }

  rejectRequest(id: number) {
    this.connectionService.rejectRequest(id).subscribe({
      next: () => {
        this.pendingRequests = this.pendingRequests.filter(r => r.id !== id);
        alert('Connection request rejected!');
      },
      error: () => alert('Failed to reject request')
    });
  }

  removeConnection(id: number) {
    if (confirm('Remove this connection?')) {
      this.connectionService.removeConnection(id).subscribe({
        next: () => {
          this.connections = this.connections.filter(c => c.id !== id);
          alert('Connection removed successfully!');
        },
        error: () => alert('Failed to remove connection')
      });
    }
  }

  unfollowUser(userId: number) {
    this.followService.unfollowUser(userId).subscribe({
      next: () => {
        this.loadFollowing();
        alert('Unfollowed successfully!');
      },
      error: () => alert('Failed to unfollow')
    });
  }

  searchUsers() {
    if (!this.searchKeyword.trim()) {
      this.searchResults = [];
      return;
    }
    this.userService.searchUsers(this.searchKeyword).subscribe({
      next: (data) => {
        this.searchResults = data.filter((user: any) => user.id !== this.currentUserId);
        // Initialize button states
        this.searchResults.forEach(user => {
          user.connectionStatus = 'none'; // none, pending, connected
          user.followStatus = 'none'; // none, following
        });
      },
      error: () => {}
    });
  }

  sendConnectionRequest(userId: number) {
    this.connectionService.sendRequest(userId).subscribe({
      next: () => {
        const user = this.searchResults.find(u => u.id === userId);
        if (user) user.connectionStatus = 'pending';
      },
      error: () => alert('Failed to send request')
    });
  }

  followUser(userId: number) {
    this.followService.followUser(userId).subscribe({
      next: () => {
        const user = this.searchResults.find(u => u.id === userId);
        if (user) user.followStatus = 'following';
        this.loadFollowing();
      },
      error: () => alert('Failed to follow')
    });
  }

  unfollowFromSearch(userId: number) {
    this.followService.unfollowUser(userId).subscribe({
      next: () => {
        const user = this.searchResults.find(u => u.id === userId);
        if (user) user.followStatus = 'none';
        this.loadFollowing();
      },
      error: () => alert('Failed to unfollow')
    });
  }
}
