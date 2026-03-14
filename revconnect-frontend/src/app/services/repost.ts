import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepostService {
  private apiUrl = 'http://localhost:8080/api/reposts';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  repostPost(postId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${postId}`, {}, { headers: this.getHeaders() });
  }
}
