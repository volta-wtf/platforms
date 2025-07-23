import { createClient } from '@supabase/supabase-js'

// Obtener URL de Supabase de las variables disponibles
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  'https://rmextyvlfwggwkbcfmbv.supabase.co' // Fallback a tu URL específica

// Obtener clave anónima de las variables disponibles
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  'dummy-key' // Fallback para evitar errores de build

const supabaseServiceKey = 
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'dummy-service-key' // Fallback para evitar errores de build

export const supabase = createClient(supabaseUrl, supabaseKey)

// Para operaciones de servidor que requieren service role
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)