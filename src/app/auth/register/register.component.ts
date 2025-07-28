import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.strongPasswordValidator()]]
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
      this.form.markAllAsTouched();
      this.errorMessage = 'Por favor, corrige los errores en el formulario.';
    }

    this.loading = true;

    this.auth.register(this.form.value).subscribe({
      next: (res: any) => {
        console.log('Respuesta completa del servidor en registro:', res);
        this.auth.saveToken(res.token);
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 50);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Registro fallido', err);
        this.loading = false;
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Error en el registro. Por favor, inténtalo de nuevo más tarde.';
        }
      }
    });
  }

  strongPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const hasMinLength = value.length >= 8;
      const hasNumber = /[0-9]/.test(value);
      const hasNoSpecialChars = /^[a-zA-Z0-9\s]*$/.test(value);

      const passwordValid = hasMinLength && hasNumber && hasNoSpecialChars;

      if (!passwordValid) {
        return {
          strongPassword: {
            hasMinLength: hasMinLength,
            hasNumber: hasNumber,
            hasNoSpecialChars: hasNoSpecialChars
          }
        };
      }
      return null;
    };
  }

  get nameControl() {
    return this.form.get('name');
  }

  get emailControl() {
    return this.form.get('email');
  }

  get passwordControl() {
    return this.form.get('password');
  }
}
