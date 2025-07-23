#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración...\n');

const envPath = path.join(process.cwd(), '.env.local');
const requiredVars = [
  'POSTGRES_URL',
  'AUTH_GITHUB_ID',
  'AUTH_GITHUB_SECRET',
  'NEXTAUTH_SECRET'
];

const optionalVars = [
  'BLOB_READ_WRITE_TOKEN',
  'KV_REST_API_URL',
  'KV_REST_API_TOKEN',
  'OPENAI_API_KEY'
];

if (!fs.existsSync(envPath)) {
  console.log('❌ Archivo .env.local no encontrado');
  console.log('💡 Ejecuta: pnpm run setup');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const envLines = envContent.split('\n');
const envVars = {};

envLines.forEach(line => {
  const [key, value] = line.split('=');
  if (key && value && !key.startsWith('#')) {
    envVars[key.trim()] = value.trim();
  }
});

let allGood = true;

console.log('✅ Variables requeridas:');
requiredVars.forEach(varName => {
  const value = envVars[varName];
  if (!value || value.includes('tu-') || value.includes('tu_')) {
    console.log(`❌ ${varName}: NO configurada`);
    allGood = false;
  } else {
    console.log(`✅ ${varName}: Configurada`);
  }
});

console.log('\n📦 Variables opcionales:');
optionalVars.forEach(varName => {
  const value = envVars[varName];
  if (!value || value.includes('tu-') || value.includes('tu_')) {
    console.log(`⚠️  ${varName}: No configurada (opcional)`);
  } else {
    console.log(`✅ ${varName}: Configurada`);
  }
});

if (!allGood) {
  console.log('\n❌ Faltan variables requeridas');
  console.log('📖 Consulta QUICK_START.md para instrucciones');
  process.exit(1);
}

console.log('\n🎉 ¡Configuración completa!');
console.log('🚀 Ahora puedes ejecutar: pnpm run db:push && pnpm dev');