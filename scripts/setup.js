#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🚀 Configurando tu plataforma de blogs...\n');

// Verificar si .env.local existe
const envPath = path.join(process.cwd(), '.env.local');
const envExamplePath = path.join(process.cwd(), '.env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    console.log('📋 Copiando .env.example a .env.local...');
    fs.copyFileSync(envExamplePath, envPath);

    // Generar NEXTAUTH_SECRET automáticamente
    const envContent = fs.readFileSync(envPath, 'utf8');
    const nextAuthSecret = crypto.randomBytes(32).toString('hex');
    const updatedContent = envContent.replace('tu-secret-super-seguro-aqui', nextAuthSecret);
    fs.writeFileSync(envPath, updatedContent);

    console.log('✅ Archivo .env.local creado con NEXTAUTH_SECRET generado automáticamente');
  } else {
    console.log('❌ Archivo .env.example no encontrado');
    process.exit(1);
  }
} else {
  console.log('✅ Archivo .env.local ya existe');
}

console.log('\n📝 Pasos siguientes:');
console.log('1. Configura las variables de entorno en .env.local');
console.log('2. Ejecuta: pnpm install');
console.log('3. Configura GitHub OAuth: https://github.com/settings/applications/new');
console.log('4. Configura servicios de Vercel (Postgres, Blob, KV)');
console.log('5. Ejecuta: pnpm run db:push');
console.log('6. Ejecuta: pnpm dev');
console.log('\n📖 Consulta SETUP.md para instrucciones detalladas');
console.log('\n🎉 ¡Configuración inicial completada!');