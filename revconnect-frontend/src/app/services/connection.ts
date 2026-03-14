import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private apiUrl = 'http://localhost:8080/api/connections';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  sendRequest(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/request/${userId}`, {}, { headers: this.getHeaders() });
  }

  acceptRequest(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/accept/${id}`, {}, { headers: this.getHeaders() });
  }

  rejectRequest(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/reject/${id}`, {}, { headers: this.getHeaders() });
  }

  getPendingRequests(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pending`, { headers: this.getHeaders() });
  }

  getMyConnections(): Observable<any> {
    return this.http.get(`${this.apiUrl}/my`, { headers: this.getHeaders() });
  }

  removeConnection(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
