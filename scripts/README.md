# 📜 Scripts de Configuración

Esta carpeta contiene scripts de utilidad para configurar y mantener el proyecto.

## 🚀 Scripts Disponibles

### `setup.js`
Script de configuración inicial que:
- Verifica si existe el archivo `.env.local`
- Copia `.env.example` a `.env.local` si no existe
- Genera automáticamente un `NEXTAUTH_SECRET` seguro
- Proporciona instrucciones para completar la configuración

**Uso:**
```bash
pnpm run setup
```

### `check-config.js`
Script de verificación de configuración que:
- Verifica que todas las variables de entorno requeridas estén configuradas
- Organiza las variables por categorías:
  - ✅ **Variables requeridas** (5 variables)
  - 📦 **Variables recomendadas** (2 variables)
  - 🌐 **Variables para dominios personalizados** (3 variables)
  - 🗄️ **Variables de Supabase** (3 variables)
  - ⚙️ **Variables adicionales** (2 variables)
- Muestra un resumen con el total de variables configuradas
- Detecta valores placeholder como "tu-", "tu_", "your-"

**Uso:**
```bash
pnpm run check-env
```

## 📋 Variables de Entorno

### Variables Requeridas
- `POSTGRES_URL` - Base de datos PostgreSQL
- `AUTH_GITHUB_ID` - ID de la aplicación GitHub OAuth
- `AUTH_GITHUB_SECRET` - Secret de la aplicación GitHub OAuth
- `NEXTAUTH_SECRET` - Secret para NextAuth.js
- `NEXT_PUBLIC_ROOT_DOMAIN` - Dominio raíz de la aplicación

### Variables Recomendadas
- `BLOB_READ_WRITE_TOKEN` - Para almacenamiento de archivos
- `OPENAI_API_KEY` - Para funciones de IA

### Variables para Dominios Personalizados
- `AUTH_BEARER_TOKEN` - Token de Vercel API
- `PROJECT_ID_VERCEL` - ID del proyecto en Vercel
- `TEAM_ID_VERCEL` - ID del equipo en Vercel

### Variables de Supabase (Migración)
- `SUPABASE_URL` - URL de Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Clave anónima pública
- `SUPABASE_SERVICE_ROLE_KEY` - Clave de servicio

### Variables Adicionales
- `NEXTAUTH_URL` - URL de NextAuth
- `DATABASE_URL` - URL alternativa de base de datos

## 🔧 Flujo de Configuración

1. **Configuración inicial:**
   ```bash
   pnpm run setup
   ```

2. **Verificar configuración:**
   ```bash
   pnpm run check-env
   ```

3. **Configuración completa:**
   ```bash
   pnpm run complete-setup
   ```

## 📖 Documentación Adicional

- [QUICK_START.md](../QUICK_START.md) - Guía de configuración rápida
- [SETUP.md](../SETUP.md) - Guía completa de configuración
- [README.md](../README.md) - Documentación principal del proyecto