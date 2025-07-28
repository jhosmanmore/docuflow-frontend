import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import Modal from 'bootstrap/js/dist/modal';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  usuarios: any[] = [];
  cargando = true;
  filtro: string = '';
  usuarioEdit: any = null;
  currentUserId: string | null = null;

  private demoUserIds: string[] = [
    '688260b3ccd21678d770b5cd', // iD del usuario@docuflow.com
    '68825f37ccd21678d770b5ca' // iD del admin@docuflow.com
  ];

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.currentUserId = payload.id;
      } catch (e) {
        console.error('Error decodificando el token:', e);
      }
    }

    this.loadUsers();
  }

  loadUsers(): void {
    this.cargando = true;
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.usuarios = this.organizeUserList(res);
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.cargando = false;
      }
    });
  }

  private organizeUserList(users: any[]): any[] {
    if (!this.currentUserId) {
      return users;
    }

    let currentUser: any | undefined;
    const otherUsers: any[] = [];

    users.forEach(user => {
      if (user._id === this.currentUserId) {
        currentUser = user;
      } else {
        otherUsers.push(user);
      }
    });

    if (currentUser) {
      return [currentUser, ...otherUsers];
    } else {
      return users;
    }
  }

  isDemoUser(userId: string): boolean {
    return this.demoUserIds.includes(userId);
  }

  @ViewChild('editModal') editModalRef!: ElementRef;

  editarUsuario(usuario: any) {
    if (this.isDemoUser(usuario._id)) {
      alert('No se puede editar un administrador de demostración.');
      return;
    }
    this.usuarioEdit = { ...usuario };
    setTimeout(() => {
      const modal = new Modal(this.editModalRef.nativeElement);
      modal.show();
    }, 0);
  }

  guardarCambios() {
    this.userService.updateUser(this.usuarioEdit._id, {
      name: this.usuarioEdit.name,
      role: this.usuarioEdit.role
    }).subscribe({
      next: (res) => {
        this.loadUsers();
        Modal.getInstance(document.getElementById('editUserModal')!)?.hide();
      },
      error: err => {
        console.error('Error al guardar cambios:', err);
      }
    });
  }

  eliminarUsuario(id: string) {
    if (this.isDemoUser(id)) {
      alert('No se puede eliminar un usuario de demostración.');
      return;
    }
    if (confirm('¿Estás seguro de eliminar este usuario?. También se eliminarán todos los archivos asociados a este.')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: err => {
          console.error('Error al eliminar:', err);
        }
      });
    }
  }
}
