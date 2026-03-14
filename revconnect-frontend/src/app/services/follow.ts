import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private apiUrl = 'http://localhost:8080/api/follow';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  followUser(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}`, {}, { headers: this.getHeaders() });
  }

  unfollowUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`, { headers: this.getHeaders() });
  }

  getFollowers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/followers`, { headers: this.getHeaders() });
  }

  getFollowing(): Observable<any> {
    return this.http.get(`${this.apiUrl}/following`, { headers: this.getHeaders() });
  }
}
