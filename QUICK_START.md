# 🚀 Configuración Rápida - Pasos Inmediatos

## ✅ Lo que ya está hecho:
- ✅ Dependencias instaladas
- ✅ Variables de entorno configuradas (.env.local creado)
- ✅ Proyecto vinculado a Vercel
- ✅ Scripts de desarrollo agregados

## 🔧 Pasos inmediatos para completar:

### 1. Configurar GitHub OAuth (2 minutos)
```bash
# Abre en tu navegador:
https://github.com/settings/applications/new
```

**Configuración:**
- Application name: `Tu App de Blogs`
- Homepage URL: `http://localhost:3000`
- Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

**Después:**
1. Copia el `Client ID` y `Client Secret`
2. Edita `.env.local` y pega los valores en `AUTH_GITHUB_ID` y `AUTH_GITHUB_SECRET`

### 2. Configurar servicios de Vercel (5 minutos)
```bash
# Abre el dashboard de Vercel
https://vercel.com/dashboard
```

**En tu proyecto "platforms":**

**A. Configurar PostgreSQL:**
1. Ve a Storage tab → Create Database → PostgreSQL
2. Nombre: `platforms-db`
3. Copia la `POSTGRES_URL` a tu `.env.local`

**B. Configurar Blob Storage:**
1. Ve a Storage tab → Create Store → Blob
2. Nombre: `platforms-storage`
3. Copia el `BLOB_READ_WRITE_TOKEN` a tu `.env.local`

**C. Configurar KV (Rate Limiting):**
1. Ve a Storage tab → Create Store → KV
2. Nombre: `platforms-cache`
3. Copia `KV_REST_API_URL` y `KV_REST_API_TOKEN` a tu `.env.local`

### 3. Configurar OpenAI (Opcional - 2 minutos)
```bash
# Si quieres funciones de IA:
https://platform.openai.com/api-keys
```
1. Crea una nueva API Key
2. Agrégala como `OPENAI_API_KEY` en `.env.local`

### 4. Probar localmente
```bash
# Ejecutar migraciones de base de datos
pnpm run db:push

# Iniciar el servidor de desarrollo
pnpm dev
```

### 5. Verificar que funciona
- **Dashboard**: http://app.localhost:3000
- **Página principal**: http://localhost:3000
- **Prueba crear una cuenta** con GitHub

### 6. Deploy a producción
```bash
# Cuando todo funcione localmente
vercel --prod
```

## 🎯 URLs importantes después del deploy:

- **App Dashboard**: https://app.TU-DOMINIO.vercel.app
- **Página principal**: https://TU-DOMINIO.vercel.app
- **Blogs de usuarios**: https://usuario.TU-DOMINIO.vercel.app

## ⚠️ Variables de entorno que DEBES configurar en Vercel:

Cuando hagas el deploy, agrega estas variables en Vercel Dashboard → Settings → Environment Variables:

```
NEXTAUTH_URL=https://tu-dominio.vercel.app
NEXT_PUBLIC_ROOT_DOMAIN=tu-dominio.vercel.app
NEXT_PUBLIC_VERCEL_ENV=production
AUTH_GITHUB_ID=tu_github_client_id
AUTH_GITHUB_SECRET=tu_github_client_secret
POSTGRES_URL=postgres://...
BLOB_READ_WRITE_TOKEN=...
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
OPENAI_API_KEY=sk-... (opcional)
```

## 🆘 ¿Problemas?

1. **Error de base de datos**: Verifica que `POSTGRES_URL` esté en `.env.local`
2. **Error de auth**: Verifica GitHub OAuth settings
3. **Error de upload**: Verifica `BLOB_READ_WRITE_TOKEN`

**¡Tu plataforma estará lista en menos de 10 minutos!** 🎉