-- Sitio público de demostración para platforms-volta.vercel.app.
-- La clave estable permite aplicar este seed más de una vez sin duplicarlo.
INSERT INTO "sites" (
  "id",
  "name",
  "description",
  "logo",
  "image",
  "subdomain",
  "customDomain",
  "createdAt",
  "updatedAt"
)
VALUES (
  'demo-site-volta',
  'Platforms Demo',
  'Un sitio de muestra publicado con Platforms.',
  '/logo.png',
  '/demo/platforms-cover.svg',
  'demo',
  'platforms-volta.vercel.app',
  now(),
  now()
)
ON CONFLICT ("id") DO UPDATE
SET
  "image" = CASE
    WHEN "sites"."image" IS NULL OR "sites"."image" = '/placeholder.png'
      THEN EXCLUDED."image"
    ELSE "sites"."image"
  END,
  "logo" = CASE
    WHEN "sites"."logo" IS NULL OR "sites"."logo" = '/logo.png'
      THEN EXCLUDED."logo"
    ELSE "sites"."logo"
  END;

INSERT INTO "posts" (
  "id",
  "title",
  "description",
  "content",
  "slug",
  "published",
  "image",
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
  '/demo/welcome-cover.svg',
  'demo-site-volta',
  now(),
  now()
)
ON CONFLICT ("id") DO UPDATE
SET "image" = CASE
  WHEN "posts"."image" IS NULL OR "posts"."image" = '/placeholder.png'
    THEN EXCLUDED."image"
  ELSE "posts"."image"
END;
