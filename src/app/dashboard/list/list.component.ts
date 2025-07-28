import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  documents: any[] = [];
  filteredDocuments: any[] = [];
  searchTerm: string = '';
  cargando: boolean = true;

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.cargando = true;
    this.documentService.getDocuments().subscribe({
      next: (res: any) => {
        this.documents = res.sort((a: any, b: any) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        this.applyFilter();
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar documentos:', err);
        this.cargando = false;
      }
    });
  }

  applyFilter(): void {
    if (!this.searchTerm) {
      this.filteredDocuments = [...this.documents];
    } else {
      this.filteredDocuments = this.documents.filter(doc =>
        doc.originalName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        doc.category.toLowerCase().includes(this.searchTerm.toLowerCase())
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

  deleteDocument(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este documento de forma permanente? Esta acción no se puede deshacer.')) {
      this.documentService.deleteDocument(id).subscribe({
        next: () => {
          alert('Documento eliminado con éxito.');
          this.loadDocuments();
        },
        error: (err) => {
          console.error('Error al eliminar documento:', err);
          alert('Error al eliminar el documento. Por favor, inténtelo de nuevo.');
        }
      });
    }
  }

  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  }
}
