#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración...\n');

const envPath = path.join(process.cwd(), '.env.local');
const envExamplePath = path.join(process.cwd(), '.env.example');

// Variables requeridas para el funcionamiento básico
const requiredVars = [
  'POSTGRES_URL',
  'AUTH_GITHUB_ID',
  'AUTH_GITHUB_SECRET',
  'NEXTAUTH_SECRET',
  'NEXT_PUBLIC_ROOT_DOMAIN'
];

// Variables opcionales pero recomendadas
const recommendedVars = [
  'BLOB_READ_WRITE_TOKEN',
  'OPENAI_API_KEY'
];

// Variables para dominios personalizados (opcionales)
const domainVars = [
  'AUTH_BEARER_TOKEN',
  'PROJECT_ID_VERCEL',
  'TEAM_ID_VERCEL'
];

// Variables de Supabase (opcionales - para migración)
const supabaseVars = [
  'SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
];

// Variables adicionales (opcionales)
const additionalVars = [
  'NEXTAUTH_URL',
  'DATABASE_URL'
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
  if (!value || value.includes('tu-') || value.includes('tu_') || value.includes('your-')) {
    console.log(`❌ ${varName}: NO configurada`);
    allGood = false;
  } else {
    console.log(`✅ ${varName}: Configurada`);
  }
});

console.log('\n📦 Variables recomendadas:');
recommendedVars.forEach(varName => {
  const value = envVars[varName];
  if (!value || value.includes('tu-') || value.includes('tu_') || value.includes('your-')) {
    console.log(`⚠️  ${varName}: No configurada (recomendada)`);
  } else {
    console.log(`✅ ${varName}: Configurada`);
  }
});

console.log('\n🌐 Variables para dominios personalizados:');
domainVars.forEach(varName => {
  const value = envVars[varName];
  if (!value || value.includes('tu-') || value.includes('tu_') || value.includes('your-')) {
    console.log(`⚠️  ${varName}: No configurada (para dominios personalizados)`);
  } else {
    console.log(`✅ ${varName}: Configurada`);
  }
});

console.log('\n🗄️ Variables de Supabase (migración):');
supabaseVars.forEach(varName => {
  const value = envVars[varName];
  if (!value || value.includes('tu-') || value.includes('tu_') || value.includes('your-')) {
    console.log(`⚠️  ${varName}: No configurada (para migración de Supabase)`);
  } else {
    console.log(`✅ ${varName}: Configurada`);
  }
});

console.log('\n⚙️ Variables adicionales:');
additionalVars.forEach(varName => {
  const value = envVars[varName];
  if (!value || value.includes('tu-') || value.includes('tu_') || value.includes('your-')) {
    console.log(`⚠️  ${varName}: No configurada (configuración adicional)`);
  } else {
    console.log(`✅ ${varName}: Configurada`);
  }
});

if (!allGood) {
  console.log('\n❌ Faltan variables requeridas');
  console.log('📖 Consulta QUICK_START.md para instrucciones');
  console.log('📋 Variables requeridas que debes configurar:');
  requiredVars.forEach(varName => {
    const value = envVars[varName];
    if (!value || value.includes('tu-') || value.includes('tu_') || value.includes('your-')) {
      console.log(`   - ${varName}`);
    }
  });
  process.exit(1);
}

console.log('\n🎉 ¡Configuración completa!');
console.log('🚀 Ahora puedes ejecutar: pnpm run db:push && pnpm dev');

// Mostrar resumen de configuración
const configuredCount = Object.keys(envVars).length;
const totalVars = [...requiredVars, ...recommendedVars, ...domainVars, ...supabaseVars, ...additionalVars].length;

console.log(`\n📊 Resumen: ${configuredCount} variables configuradas de ${totalVars} totales`);