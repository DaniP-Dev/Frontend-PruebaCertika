# Frontend Prueba Certika

Aplicacion web construida con Next.js (App Router) en JavaScript para consumir la API REST del backend y gestionar tareas.

## Requisitos

- Node.js 20 o superior
- npm 10 o superior
- Backend corriendo en `http://localhost:3000`

## Instalacion

```bash
npm install
```

## Variables de entorno

1. Crear el archivo local de entorno:

```bash
cp .env.example .env.local
```

En Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

2. Configurar la URL del backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Ejecucion

1. Levantar backend (en otra terminal):

```bash
cd ../Backend-PruebaCertika
npm install
npm run dev
```

2. Levantar frontend:

```bash
npm run dev
```

3. Abrir [http://localhost:3001](http://localhost:3001).

## Funcionalidades implementadas

- Listado de tareas desde `GET /api/tasks`
- Creacion de tareas con validacion de titulo requerido
- Edicion de tareas existentes
- Completado de tareas con `PATCH /api/tasks/:id/complete`
- Eliminacion de tareas
- Manejo de estado de UI (`loading`, `refresh`, `submitting`, `busyTaskId`)
- Manejo y visualizacion de errores de API
- Componentes reutilizables: `TaskForm`, `TaskList`, `TaskItem`

## Estructura principal

- `app/page.js`: estado principal y orquestacion de acciones
- `components/TaskForm.js`: formulario de creacion con validaciones
- `components/TaskList.js`: renderizado del listado de tareas
- `components/TaskItem.js`: item con acciones de editar, completar y eliminar
- `lib/tasks.api.js`: cliente API para consumo del backend
