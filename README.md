# Frontend Prueba Certika

Frontend base con Next.js (App Router) en JavaScript.

## Variables de entorno

Copiar `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Valor requerido:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Ejecucion local

```bash
# Terminal 1 (backend)
# cd ../Backend-PruebaCertika && npm run dev

# Terminal 2 (frontend)
npm install
npm run dev
```

Abrir [http://localhost:3001](http://localhost:3001).

La pagina principal se edita en `app/page.js`.
# Frontend-PruebaCertika
