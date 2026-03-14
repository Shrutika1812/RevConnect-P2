import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private apiUrl = 'http://localhost:8080/api/likes';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  likePost(postId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${postId}`, {}, { headers: this.getHeaders() });
  }

  unlikePost(postId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${postId}`, { headers: this.getHeaders() });
  }

  getLikesByPost(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/post/${postId}`, { headers: this.getHeaders() });
  }
}
