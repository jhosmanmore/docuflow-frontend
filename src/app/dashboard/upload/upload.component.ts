import { Component } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  selectedFile: File | null = null;
  category: string = '';
  visibility: 'public' | 'private' = 'private';
  message: string | null = null;
  isError: boolean = false;

  constructor(private documentService: DocumentService) {}

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  upload() {
    this.message = null;
    this.isError = false;

    if (!this.selectedFile || !this.category) {
      this.message = 'Por favor, selecciona un archivo y especifica una categoría.';
      this.isError = true;
      return;
    }

    this.documentService.uploadDocument(this.selectedFile, this.category, this.visibility).subscribe({
      next: () => {
        this.message = 'Documento subido con éxito.';
        this.isError = false;
        this.selectedFile = null;
        this.category = '';
        this.visibility = 'private';
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al subir documento:', err);
        this.isError = true;
        if (err.error && err.error.message) {
          this.message = `Error al subir documento: ${err.error.message}`;
        } else {
          this.message = 'Error al subir documento. Por favor, inténtalo de nuevo.';
        }
      }
    });
  }
}
