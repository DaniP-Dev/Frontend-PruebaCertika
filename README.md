# Frontend - Prueba Certika

Interfaz hecha con Next.js para gestionar tareas consumiendo la API del backend.
Desde aqui puedes crear, editar, completar y eliminar tareas.

## Enlaces utiles

- Frontend en produccion: `https://frontend-prueba-certika.vercel.app`
- Backend en produccion: `https://backend-pruebacertika.onrender.com`
- Swagger del backend: `https://backend-pruebacertika.onrender.com/docs`

## Requisitos

- Node.js 20 o superior
- npm 10 o superior
- Backend corriendo (si trabajas en local, normalmente en `http://localhost:3000`)

## Levantar en local

Instala dependencias:

```bash
npm install
```

Crea el archivo de entorno:

```bash
cp .env.example .env.local
```

En PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Configura la URL del backend local:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Ahora ejecuta:

```bash
npm run dev
```

Abre [http://localhost:3001](http://localhost:3001).

## Configuracion para produccion (Vercel + Render, informativa)

Esta seccion aplica solo si haces despliegue en tus propias cuentas.

En Vercel, define:

```env
NEXT_PUBLIC_API_URL=https://backend-pruebacertika.onrender.com
```

En Render (backend), define:

```env
CORS_ORIGIN=https://frontend-prueba-certika.vercel.app
```

Si cambias variables, haz redeploy en ambos servicios para que tomen los valores nuevos.

## Funcionalidades

- Listar tareas desde `GET /api/tasks`.
- Crear tareas validando titulo obligatorio.
- Editar titulo y estado.
- Completar tareas con `PATCH /api/tasks/:id/complete`.
- Eliminar tareas.
- Mostrar estados de carga y errores de API en pantalla.

## Estructura rapida

- `app/page.js`: estado principal y acciones.
- `components/TaskForm.js`: formulario de creacion.
- `components/TaskList.js`: lista de tareas.
- `components/TaskItem.js`: acciones por tarea.
- `lib/tasks.api.js`: cliente HTTP hacia el backend.

## Checklist de validacion final

1. El frontend abre en `https://frontend-prueba-certika.vercel.app`.
2. El backend responde en `https://backend-pruebacertika.onrender.com/health`.
3. Se pueden crear, editar, completar y eliminar tareas desde el frontend desplegado.
