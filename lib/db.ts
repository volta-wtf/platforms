import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Usar DATABASE_URL personalizada o fallback a POSTGRES_URL automática de Supabase
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL!;

// SSL solo para el pooler remoto de Supabase (que exige sslmode=require).
// El Postgres local de desarrollo no tiene SSL, así que lo activamos de forma condicional.
const ssl = connectionString.includes("sslmode=require") ? "require" : false;
const client = postgres(connectionString, {
  ssl,
  prepare: false,
  max: 1, // Limitar conexiones para desarrollo local
  idle_timeout: 20,
  max_lifetime: 60 * 30
});

const db = drizzle(client, { schema, logger: true });

export default db;

export type DrizzleClient = typeof db;
