import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorMessage: string | null = null;
  showDemoModal: boolean = false;
  demoMessage: string = `
    <p>Esta es una versión de demostración de <strong>Docuflow</strong>, desarrollada exclusivamente como proyecto personal.</p>
    <p>Para explorar el sistema sin necesidad de registrarte, puedes usar las siguientes credenciales de demostración:</p>
    <ul>
      <li><strong>Modo Usuario:</strong><br>
          Correo: <strong>usuario@docuflow.com</strong><br>
          Contraseña: <strong>demousuario1</strong></li>
      <li><strong>Modo Administrador:</strong><br>
          Correo: <strong>admin@docuflow.com</strong><br>
          Contraseña: <strong>demoadmin1</strong></li>
    </ul>
    <p>O bien, puedes registrarte con tu propia cuenta si lo deseas.</p>
  `;

  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  onCloseDemoModal(): void {
    this.showDemoModal = false;
  }

  openDemoModal(): void {
    this.showDemoModal = true;
  }

  onSubmit() {
    this.errorMessage = null;

    if (this.form.invalid) {
      this.errorMessage = 'Por favor, introduce un correo y contraseña válidos.';
      return;
    }

    this.loading = true;

    this.auth.login(this.form.value).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.token);
        this.router.navigate(['/dashboard']);
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Login fallido', err);
        this.loading = false;
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else if (err.status === 404) {
          this.errorMessage = 'Usuario no encontrado. Verifica tu correo.';
        } else if (err.status === 401) {
          this.errorMessage = 'Contraseña incorrecta. Inténtalo de nuevo.';
        } else {
          this.errorMessage = 'Error en el inicio de sesión. Por favor, inténtalo de nuevo más tarde.';
        }
      }
    });
  }
}

