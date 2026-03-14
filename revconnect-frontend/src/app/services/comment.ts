import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8080/api/comments';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  addComment(postId: number, comment: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${postId}`, comment, { headers: this.getHeaders() });
  }

  getComments(postId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${postId}`, { headers: this.getHeaders() });
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${commentId}`, { headers: this.getHeaders() });
  }
}
