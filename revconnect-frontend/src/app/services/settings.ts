import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private apiUrl = 'http://localhost:8080/api/settings';

  constructor(private http: HttpClient) {}

  getSettings(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  updatePrivacy(userId: number, isPublic: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/privacy`, { isPublic });
  }

  updateNotifications(userId: number, preferences: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/notifications`, preferences);
  }

  changePassword(userId: number, currentPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}/change-password`, {
      currentPassword,
      newPassword
    });
  }

  deleteAccount(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }
}
