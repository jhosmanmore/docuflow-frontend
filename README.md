# Docuflow (Frontend)


### 📄 Descripción del Proyecto
Este repositorio contiene el código fuente del frontend de Docuflow, una aplicación web moderna para la gestión y organización de documentos en la nube. Docuflow permite a los usuarios subir, almacenar, descargar y eliminar sus archivos de forma segura, con opciones de visibilidad pública y privada. Además, incluye una sección para explorar documentos compartidos por otros usuarios y un panel de administración para la gestión de usuarios.

Desarrollado con Angular, este frontend interactúa con un conjunto de microservicios Node.js/Express desplegados en AWS EC2, proporcionando una experiencia de usuario fluida y reactiva.

Este proyecto es parte de mi portafolio personal, demostrando mis habilidades en el desarrollo web frontend y la integración con arquitecturas de microservicios.

### ✨ Características Principales
#### Autenticación de Usuarios: 
- Registro e inicio de sesión seguro.

#### Gestión de Documentos Personal:

- Subida de archivos con categorías personalizadas.

- Opción de visibilidad: Público o Privado al subir un archivo.

- Listado, búsqueda, descarga y eliminación de documentos propios.

#### Documentos Compartidos:

- Explora archivos públicos subidos por todos los usuarios del sistema.

- Visualiza detalles como el nombre del archivo, categoría, fecha de subida y el usuario que lo compartió.

- Funcionalidad de descarga para documentos públicos.

#### Gestión de Perfil: 
- Los usuarios pueden actualizar su información personal y contraseña.

#### Panel de Administración (Solo Admin):

- Listado y gestión de todos los usuarios registrados.

- Edición de roles de usuario.

- Protección de usuarios de demostración (no pueden ser eliminados).

#### Interfaz de Usuario Responsiva: 
- Adaptada para dispositivos móviles y de escritorio.

- Indicadores de Carga: Spinners visuales en botones para mejorar la experiencia de usuario durante operaciones asíncronas.

### 💻 Tecnologías Utilizadas
#### Frontend:

- Angular

- TypeScript

- HTML5

- SCSS (Sass)

- RxJS

#### Despliegue Frontend:

- Vercel (Actualmente sin despligue)

### 🏗️ Arquitectura del Frontend
- El frontend de Docuflow es una Single Page Application (SPA) construida con Angular, que se comunica con un backend de microservicios a través de peticiones HTTP RESTful.

- Módulos de Carga Perezosa (Lazy Loading): La aplicación está estructurada con módulos de carga perezosa para optimizar el rendimiento, cargando solo el código necesario cuando el usuario navega a una sección específica (ej. AuthModule, DashboardModule).

- Servicios: Utiliza servicios inyectables para la lógica de negocio, la comunicación con la API y la gestión del estado de la aplicación (ej. AuthService, UserService, DocumentService).

- Guardias de Ruta: Implementa AuthGuard y AdminGuard para proteger rutas y asegurar el acceso basado en el rol del usuario.

- Interceptores HTTP: Un AuthInterceptor se encarga de añadir automáticamente el token JWT a las cabeceras de todas las peticiones salientes.

### 📸 Capturas
#### Inicio y registro:
<img width="400" height="800" alt="Captura de pantalla 2025-07-29 113902" src="https://github.com/user-attachments/assets/7dda2e84-b339-4c5d-81b9-d3dbb8ddd7a9" />
<img width="352" height="800" alt="Captura de pantalla 2025-07-29 113919" src="https://github.com/user-attachments/assets/c8877351-abed-4211-aaf3-694843c2fd4f" />

#### Interfaz principal:
- Mis documentos (Solo del usuario):
<img width="600" height="623" alt="image" src="https://github.com/user-attachments/assets/5456972b-de56-4900-9a4d-c98b9b33ab0c" />

- Docs Compartidos (Documentos públicos compartidos por todos los usuarios):
<img width="600" height="670" alt="image" src="https://github.com/user-attachments/assets/3572c74e-072e-4d3f-b96c-3a0a685cf93b" />

- Subir (Subir un archivo, documento, etc):
<img width="600" height="523" alt="image" src="https://github.com/user-attachments/assets/af5d655a-3196-44a9-bf27-ced7ec407676" />

- Usuarios (Ver lista de usuarios del sistema, solo disponible para Administradores):
<img width="600" height="581" alt="image" src="https://github.com/user-attachments/assets/6bb747b3-c2b6-446d-92de-a7a36c22a473" />

- Perfil (Actualizar perfil):
<img width="600" height="732" alt="image" src="https://github.com/user-attachments/assets/8b4e135c-4b24-4b20-aa5b-8852b242679c" />

#### Modo móvil (Responsive):
<img width="350" height="780" alt="image" src="https://github.com/user-attachments/assets/37574e0b-de4b-4a72-bc36-dd5d4786f733" />
<img width="350" height="780" alt="image" src="https://github.com/user-attachments/assets/bbcb4f26-9688-4273-b95f-d88392a379b7" />

## Conexión al Backend
- El frontend se conecta a los microservicios backend desplegados en AWS EC2.

#### Desarrollado por: 
Jhosman Moreno
