# Gestion_de_Libros_STA

## Prueba Tecnica - Gestion de Libros

### Descripcion General del Proyecto
Se requiere una aplicacion basica que permita gestionar una coleccion de libros. El usuario podra simular un inicio de sesion mediante su correo electronico, agregar nuevos libros, visualizar los detalles de un libro, y realizar operaciones de actualizacion y eliminacion.

### Objetivo de la Prueba
Esta prueba evalua tu capacidad para:

- Estructurar una aplicacion CRUD basica.
- Simular un sistema de autenticacion simple.
- Implementar una interfaz funcional.
- Aplicar buenas practicas de desarrollo (estructura del codigo, validaciones, manejo de errores, etc.).

### Requisitos Funcionales

1. **Pantallas requeridas:**
   - Pantalla de inicio: lista de libros registrados.
   - Pantalla para agregar libro: formulario con campos para ingresar los datos del libro.
   - Pantalla de detalle del libro: muestra la informacion completa del libro y permite su edicion y eliminacion.

2. **Registro de libros:**
   Cada libro debe tener los siguientes campos:
   - Titulo (texto)
   - Autor (texto)
   - Genero (texto)
   - Valoracion (numero del 1 al 5)

3. **Simulacion de login:**
   - El usuario podra ingresar un correo electronico.
   - Si el correo corresponde con un autor existente, se considera autenticado.
   - Si el correo no existe, se podra crear un nuevo autor con ese correo.

4. **Endpoints requeridos:**
   - `GET /libros` - Listar todos los libros.
   - `POST /libros` - Crear un nuevo libro.
   - `GET /libros/{id}` - Obtener el detalle de un libro.
   - `PUT /libros/{id}` - Actualizar un libro existente.
   - `DELETE /libros/{id}` - Eliminar un libro.

### Requisitos Tecnicos
Puedes utilizar cualquier stack tecnologico con el que te sientas comodo. Solo asegúrate de incluir instrucciones claras para ejecutar la aplicacion.

**Recomendaciones:**

- Framework backend (por ejemplo: FastAPI, Flask, Express)
- Desarrollo para dispositivos moviles (por ejemplo: React Native, Flutter, Kotlin, Swift)
- Base de datos simple (por ejemplo: SQLite, PostgreSQL, MongoDB)

### Entrega
Sube tu solucion a un repositorio publico (GitHub, GitLab, etc.) e incluye un archivo `README.md` con la siguiente informacion:

- Instrucciones para ejecutar la aplicacion localmente.
- Stack tecnologico utilizado.
- Capturas de pantalla (opcional).
- Consideraciones tecnicas o decisiones relevantes tomadas durante el desarrollo.

### Extras Opcionales
Estos elementos no son obligatorios, pero se valoraran positivamente:

- Validaciones de formularios.
- Pruebas unitarias o de integracion.
- Diseno responsivo o mejorado.
- Manejo adecuado de errores.
- Componentes reutilizables.

### Tiempo Estimado
Esta prueba esta disenada para resolverse en aproximadamente 4 a 8 horas. No es necesario que se complete en una sola sesion, pero se valorara una entrega dentro de un plazo razonable (idealmente entre 3 y 5 dias).

### Criterios de Evaluacion

- Cumplimiento de los requisitos funcionales.
- Organizacion y estructura del codigo.
- Claridad de la documentacion.
- Buenas practicas de desarrollo.
- Calidad de la interfaz (aunque sea basica).