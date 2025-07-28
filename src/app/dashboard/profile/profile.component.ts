import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  name: string = '';
  password: string = '';
  currentPassword: string = '';
  message: string = '';
  cargando: boolean = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.cargando = true;
    this.userService.getMyProfile().subscribe({
      next: (res: any) => {
        this.user = res;
        this.name = res.name;
        this.cargando = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al obtener perfil:', err);
        this.message = err.error?.message || 'Error al cargar el perfil. Por favor, inténtalo de nuevo.';
        this.cargando = false;
      }
    });
  }

  updateProfile() {
    this.message = '';
    const payload: any = {};
    let changesMade = false;

    if (this.name && this.name !== this.user.name) {
      payload.name = this.name;
      changesMade = true;
    }

    if (this.password) {
      payload.password = this.password;
      changesMade = true;
    }

    if (changesMade || this.currentPassword) {
      if (!this.currentPassword) {
        this.message = 'Por favor, introduce tu contraseña actual para confirmar los cambios.';
        return;
      }
      payload.currentPassword = this.currentPassword;
    } else {
      this.message = 'No hay cambios para guardar.';
      return;
    }

    this.userService.updateMyProfile(payload).subscribe({
      next: (res: any) => {
        this.user = res;
        this.password = '';
        this.currentPassword = '';
        this.message = 'Perfil actualizado correctamente';
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error actualizando perfil:', err);
        this.message = err.error?.message || 'Error actualizando perfil. Por favor, inténtalo de nuevo.';
      }
    });
  }
}
