# Urban Wear Ecommerce

Sistema web de ecommerce para una tienda de ropa urbana, diseñado bajo una arquitectura moderna cliente-servidor.

El proyecto permite a los usuarios explorar productos, realizar compras y gestionar pedidos, mientras que los administradores pueden administrar inventario, productos, facturación y pedidos desde un panel administrativo.

Este sistema está siendo desarrollado como un MVP enfocado en:

- Experiencia de usuario moderna
- Diseño minimalista y responsive
- Arquitectura escalable
- Buenas prácticas de desarrollo web, seguridad y rendimiento

---

# Tecnologías

## Frontend
- React
- Vite
- TypeScript
- Tailwind CSS

## Backend
- ASP.NET Core Web API
- Entity Framework Core

## Base de Datos
- SQL Server

---

# Arquitectura

El proyecto está dividido en dos aplicaciones principales:

```text
/project-root
│
├── frontend/   → Aplicación React + Vite
└── backend/    → API ASP.NET Core
```

---

# Funcionalidades Principales

## Cliente
- Catálogo de productos
- Vista detalle de producto
- Carrito de compras
- Checkout
- Autenticación
- Gestión de pedidos

## Administrador
- Gestión de productos
- Gestión de inventario
- Gestión de pedidos
- Gestión de facturación

---

## Versiones y ejecución

**Requisitos de software (recomendado)**

- **Node.js:** 20.x (LTS)
- **pnpm:** 8.x
- **TypeScript:** 6.x (usado por el proyecto)
- **.NET SDK:** 10.0 (net10.0) — instalar el SDK de .NET 10
- **SQL Server:** SQL Server 2019 o superior (o SQL Server Express)

**Notas importantes**: El backend está configurado para ejecutarse con un perfil HTTPS. Asegúrese de confiar en el certificado de desarrollo de .NET para poder acceder a `https://localhost:7054`.

### Ejecutar el Frontend (desarrollo)

1. Abrir una terminal en la carpeta `front`.

```bash
cd front
pnpm install
pnpm dev
```

El frontend por defecto se sirve en `http://localhost:5173`.

### Ejecutar el Backend (desarrollo, con HTTPS)

1. Abrir una terminal en la carpeta `back/API`.
2. (Opcional) Restaurar paquetes y compilar:

```bash
cd back/API
dotnet restore
dotnet build
```

3. (Recomendado) Si todavía no confía en el certificado de desarrollo HTTPS de .NET, ejecute:

```bash
dotnet dev-certs https --trust
```

4. Ejecutar el backend usando el perfil HTTPS (esto usa el perfil `https` de `Properties/launchSettings.json`):

```bash
cd back/API
dotnet run --launch-profile "https"
```

Esto levantará la API en `https://localhost:7054` (y en `http://localhost:5038` según el perfil).

### Configuración de la base de datos

La cadena de conexión se encuentra en `back/API/appsettings.json` bajo `ConnectionStrings:DbConnection`. Actualice el servidor, nombre de la base de datos o credenciales según su entorno.
