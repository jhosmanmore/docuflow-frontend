import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getMyProfile() {
    return this.http.get(`${environment.userApiUrl}/me`);
  }

  updateMyProfile(data: { name?: string; password?: string }) {
    return this.http.put(`${environment.userApiUrl}/me`, data);
  }

  getAllUsers() {
    return this.http.get<any[]>(`${environment.userApiUrl}`);
  }

  deleteUser(id: string) {
    return this.http.delete(`${environment.userApiUrl}/${id}`);
  }

  updateUser(id: string, data: { name?: string; role?: string }) {
    return this.http.put<any>(`${environment.userApiUrl}/${id}`, data);
  }

}
