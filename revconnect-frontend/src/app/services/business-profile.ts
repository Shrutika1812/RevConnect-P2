import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessProfileService {
  private apiUrl = 'http://localhost:8080/api/business-profile';

  constructor(private http: HttpClient) {}

  getProfile(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  updateBasicInfo(userId: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/basic`, data);
  }

  updateContactInfo(userId: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/contact`, data);
  }
}
