
# Gestion_de_Libros_STA

Aplicación completa para la gestión de una colección de libros, desarrollada como prueba técnica. Permite simular inicio de sesión, agregar, visualizar, editar y eliminar libros, con una arquitectura moderna y buenas prácticas de desarrollo.

---

## Tabla de Contenidos
- [Descripción General](#descripción-general)
- [Arquitectura y Stack Tecnológico](#arquitectura-y-stack-tecnológico)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [Uso de la Aplicación](#uso-de-la-aplicación)
- [API - Endpoints](#api---endpoints)
- [Capturas de Pantalla](#capturas-de-pantalla)
- [Pruebas](#pruebas)
- [Consideraciones Técnicas](#consideraciones-técnicas)
- [Extras Opcionales Implementados](#extras-opcionales-implementados)
- [Licencia](#licencia)

---

## Descripción General

Esta aplicación permite gestionar una colección de libros, simulando un sistema de autenticación por correo electrónico. El usuario puede:

- Iniciar sesión con su correo (si no existe, se crea un autor nuevo).
- Listar todos los libros registrados.
- Agregar nuevos libros.
- Visualizar detalles de un libro.
- Editar y eliminar libros existentes.

## Arquitectura y Stack Tecnológico

El proyecto está dividido en dos partes principales:

- **Backend**: Node.js, Express, Prisma ORM, SQLite, Jest (pruebas)
- **Frontend móvil**: React Native (Expo), TypeScript

**Base de datos:** SQLite (mediante Prisma ORM)

## Estructura del Proyecto

```
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── prisma.js
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── tests/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── dev.db
│   ├── package.json
│   └── ...
├── gestion-libros-app/
│   ├── app/
│   ├── components/
│   ├── assets/
│   ├── contexts/
│   ├── lib/
│   ├── package.json
│   └── ...
└── README.md
```

## Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/Gestion_de_Libros_STA.git
cd Gestion_de_Libros_STA
```

### 2. Backend

```bash
cd backend
npm install
npx prisma migrate deploy # Inicializa la base de datos
npm run dev # o npm start
```
El backend estará disponible en `http://localhost:3000`.

### 3. Frontend móvil (Expo)

```bash
cd gestion-libros-app
npm install
npx expo start
```
Escanea el QR con la app de Expo Go o ejecuta en un emulador.

## Uso de la Aplicación

1. Inicia el backend y el frontend.
2. Ingresa un correo electrónico para simular el login.
3. Agrega, edita o elimina libros desde la app móvil.
4. Visualiza detalles y lista de libros.

## API - Endpoints

### Libros

- `GET /libros` - Listar todos los libros
- `POST /libros` - Crear un nuevo libro
- `GET /libros/:id` - Obtener detalle de un libro
- `PUT /libros/:id` - Actualizar un libro
- `DELETE /libros/:id` - Eliminar un libro

### Autores (login simulado)

- `POST /login` - Login/registro de autor por correo electrónico

## Capturas de Pantalla

Puedes encontrar capturas de pantalla en la carpeta `gestion-libros-app/docs/design/`.

## Pruebas

### Backend

```bash
cd backend
npm test
```
Las pruebas están ubicadas en `backend/src/tests/`.

## Consideraciones Técnicas

- **Validaciones**: Todos los formularios y endpoints incluyen validaciones básicas.
- **Manejo de errores**: Implementado tanto en backend como en frontend.
- **Componentes reutilizables**: El frontend utiliza componentes reutilizables para formularios, botones y cabeceras.
- **Pruebas**: El backend incluye pruebas unitarias y de integración con Jest.
- **Arquitectura**: Separación clara entre backend y frontend, siguiendo buenas prácticas de organización de código.

## Extras Opcionales Implementados

- Validaciones de formularios
- Pruebas unitarias y de integración (backend)
- Manejo adecuado de errores
- Componentes reutilizables (frontend)

## Licencia

MIT