-- Sitio público de demostración para platforms-volta.vercel.app.
-- La clave estable permite aplicar este seed más de una vez sin duplicarlo.
INSERT INTO "sites" (
  "id",
  "name",
  "description",
  "subdomain",
  "customDomain",
  "createdAt",
  "updatedAt"
)
VALUES (
  'demo-site-volta',
  'Platforms Demo',
  'Un sitio de muestra publicado con Platforms.',
  'demo',
  'platforms-volta.vercel.app',
  now(),
  now()
)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "posts" (
  "id",
  "title",
  "description",
  "content",
  "slug",
  "published",
  "siteId",
  "createdAt",
  "updatedAt"
)
VALUES (
  'demo-post-volta',
  'Bienvenido a Platforms',
  'Este es un artículo de muestra para comprobar que el sitio ya publica contenido.',
  E'# Una publicación de muestra\n\nLa base de datos de Platforms ya está conectada. Este artículo confirma que el sitio puede cargar sus publicaciones desde Supabase.\n\nPodés reemplazar este contenido desde el editor de la plataforma.',
  'bienvenido-a-platforms',
  true,
  'demo-site-volta',
  now(),
  now()
)
ON CONFLICT ("id") DO NOTHING;
