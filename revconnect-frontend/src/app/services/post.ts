import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  createPost(post: any): Observable<any> {
    return this.http.post(this.apiUrl, post, { headers: this.getHeaders() });
  }

  getFeed(): Observable<any> {
    return this.http.get(`${this.apiUrl}/feed`, { headers: this.getHeaders() });
  }

  getMyPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/my`, { headers: this.getHeaders() });
  }

  updatePost(id: number, post: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, post, { headers: this.getHeaders() });
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
