import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduledPostService {
  private apiUrl = 'http://localhost:8080/api/scheduled-posts';

  constructor(private http: HttpClient) {}

  createScheduledPost(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getUserScheduledPosts(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

  deleteScheduledPost(postId: number, userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${postId}/user/${userId}`);
  }
}
