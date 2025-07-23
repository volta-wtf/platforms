# 🚀 Guía Completa de Configuración y Deployment

Esta es una plataforma multi-tenant para blogs/sitios con subdominios personalizados, construida con Next.js 14, Drizzle ORM, y servicios de Vercel.

## 📋 Prerrequisitos

- Node.js 18+
- Una cuenta en [Vercel](https://vercel.com)
- Una cuenta en [GitHub](https://github.com)
- Una API Key de [OpenAI](https://openai.com) (opcional)

## 🔧 Configuración Paso a Paso

### 1. Clonar y Configurar Variables de Entorno

```bash
# Copia el archivo de ejemplo
cp .env.example .env.local
```

### 2. Configurar GitHub OAuth

1. Ve a [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/applications/new)
2. Crea una nueva OAuth App con:
   - **Application name**: Tu aplicación
   - **Homepage URL**: `http://localhost:3000` (desarrollo) / `https://tudominio.com` (producción)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
3. Copia el **Client ID** y **Client Secret** al `.env.local`

### 3. Configurar Base de Datos PostgreSQL en Vercel

```bash
# Instala Vercel CLI
npm i -g vercel

# Inicia sesión en Vercel
vercel login

# Crea una base de datos PostgreSQL
vercel postgres create
```

Copia la `POSTGRES_URL` que te proporciona Vercel al `.env.local`.

### 4. Configurar Vercel Blob Storage

```bash
# Crea un Blob Storage
vercel blob create
```

Copia el `BLOB_READ_WRITE_TOKEN` al `.env.local`.

### 5. Configurar Vercel KV (Rate Limiting)

```bash
# Crea un KV store
vercel kv create
```

Copia `KV_REST_API_URL` y `KV_REST_API_TOKEN` al `.env.local`.

### 6. Configurar OpenAI (Opcional)

1. Ve a [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Crea una nueva API Key
3. Agrégala como `OPENAI_API_KEY` en `.env.local`

### 7. Configurar Tokens de Vercel API (Para dominios personalizados)

1. Ve a [Vercel Settings > Tokens](https://vercel.com/account/tokens)
2. Crea un nuevo token con permisos completos
3. Agrégalo como `AUTH_BEARER_TOKEN` en `.env.local`
4. Obtén tu `PROJECT_ID_VERCEL` y `TEAM_ID_VERCEL` desde tu dashboard de Vercel

## 🏗️ Instalación y Configuración Local

```bash
# Instalar dependencias
pnpm install

# Ejecutar migraciones de base de datos
pnpm run db:push

# Iniciar servidor de desarrollo
pnpm dev
```

## 🌐 Deployment a Vercel

### Opción 1: Deployment Automático

```bash
# Hacer push a GitHub y conectar en Vercel Dashboard
git add .
git commit -m "Initial setup"
git push origin main
```

### Opción 2: Deployment Manual

```bash
# Deployment directo
vercel --prod
```

### Variables de Entorno en Producción

En el Dashboard de Vercel, ve a Settings > Environment Variables y agrega:

**Variables de Producción:**
- `NEXTAUTH_URL`: https://tudominio.com
- `NEXT_PUBLIC_ROOT_DOMAIN`: tudominio.com
- `NEXT_PUBLIC_VERCEL_ENV`: production
- Todas las demás variables del `.env.local`

## 🔧 Configuración de Dominio Personalizado

1. En Vercel Dashboard > Settings > Domains
2. Agrega tu dominio personalizado
3. Configura los registros DNS según las instrucciones de Vercel
4. Actualiza `NEXT_PUBLIC_ROOT_DOMAIN` en las variables de entorno

## 🎯 Funcionalidades Principales

- **Multi-tenancy**: Cada usuario puede crear múltiples sitios
- **Subdominios personalizados**: `usuario.tudominio.com`
- **Editor de contenido**: Editor avanzado con Novel
- **Generación de contenido IA**: Integración con OpenAI
- **Gestión de archivos**: Upload con Vercel Blob
- **Análisis**: Dashboard de analytics
- **Autenticación**: Login con GitHub

## 🐛 Solución de Problemas

### Error de conexión a base de datos
- Verifica que `POSTGRES_URL` esté correctamente configurada
- Asegúrate de que las migraciones se ejecutaron correctamente

### Error de autenticación
- Verifica `AUTH_GITHUB_ID` y `AUTH_GITHUB_SECRET`
- Asegúrate de que el callback URL de GitHub coincida

### Error de almacenamiento
- Verifica `BLOB_READ_WRITE_TOKEN`
- Asegúrate de que el KV store esté configurado

## 📞 Soporte

Si encuentras problemas, revisa:
1. Los logs de Vercel
2. Las variables de entorno
3. La configuración de GitHub OAuth
4. Los permisos de API tokens

## 🚀 ¡Listo!

Tu plataforma debería estar funcionando en:
- **Desarrollo**: http://localhost:3000
- **App Dashboard**: http://app.localhost:3000 (desarrollo) / https://app.tudominio.com (producción)
- **Sitios de usuarios**: http://usuario.localhost:3000 (desarrollo) / https://usuario.tudominio.com (producción)