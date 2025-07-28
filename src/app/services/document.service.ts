import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  uploadDocument(file: File, category: string, visibility: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    formData.append('visibility', visibility);

    return this.http.post(`${environment.documentApiUrl}/upload`, formData);
  }

  getDocuments() {
    return this.http.get(`${environment.documentApiUrl}`);
  }

  getPublicDocuments() {
    return this.http.get<any[]>(`${environment.documentApiUrl}/public`);
  }

  download(id: string) {
    return this.http.get(`${environment.documentApiUrl}/${id}/download`, { responseType: 'blob' });
  }

  deleteDocument(id: string) {
    return this.http.delete(`${environment.documentApiUrl}/${id}`);
  }
}
