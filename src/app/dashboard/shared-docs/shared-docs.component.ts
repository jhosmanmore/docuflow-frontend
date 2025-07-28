import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-shared-docs',
  templateUrl: './shared-docs.component.html',
  styleUrls: ['./shared-docs.component.scss']
})
export class SharedDocsComponent implements OnInit {
  publicDocuments: any[] = [];
  filteredPublicDocuments: any[] = [];
  searchTerm: string = '';
  cargando: boolean = true;

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.loadPublicDocuments();
  }

  loadPublicDocuments(): void {
    this.cargando = true;
    this.documentService.getPublicDocuments().subscribe({
      next: (res: any) => {
        this.publicDocuments = res.sort((a: any, b: any) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        this.applyFilter();
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar documentos públicos:', err);
        this.cargando = false;
      }
    });
  }

  applyFilter(): void {
    if (!this.searchTerm) {
      this.filteredPublicDocuments = [...this.publicDocuments];
    } else {
      this.filteredPublicDocuments = this.publicDocuments.filter(doc =>
        doc.originalName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        doc.category.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (doc.uploadedBy && doc.uploadedBy.name.toLowerCase().includes(this.searchTerm.toLowerCase())) // buscar por nombre de usuario
      );
    }
  }

  download(id: string, name: string) {
    this.documentService.download(id).subscribe({
      next: blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      },
      error: err => {
        console.error('Error al descargar el archivo:', err);
        alert('Error al descargar el archivo. Por favor, inténtelo de nuevo.');
      }
    });
  }

  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  }
}
