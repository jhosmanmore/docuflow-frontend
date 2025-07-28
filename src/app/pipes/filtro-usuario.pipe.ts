import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroUsuario'
})
export class FiltroUsuarioPipe implements PipeTransform {

  transform(usuarios: any[], texto: string): any[] {
    if (!texto) return usuarios;

    texto = texto.toLowerCase();
    return usuarios.filter(u =>
      u.name.toLowerCase().includes(texto) ||
      u.email.toLowerCase().includes(texto)
    );
  }

}

