// @ts-nocheck
/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export default async function PostOG({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  try {
    const domain = decodeURIComponent(params.domain);
    const slug = decodeURIComponent(params.slug);

    // Verificar variables de entorno
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
    if (!rootDomain) {
      return new Response("Configuration error", { status: 500 });
    }

    const subdomain = domain.endsWith(`.${rootDomain}`)
      ? domain.replace(`.${rootDomain}`, "")
      : null;

    // Usar fetch directo en lugar de sql template para evitar problemas
    const response = await fetch(
      `${process.env.NEXTAUTH_URL || 'https://' + domain}/api/og-data?domain=${encodeURIComponent(domain)}&slug=${encodeURIComponent(slug)}`,
      { cache: 'no-store' }
    );

    let data = {
      title: "Blog Post",
      description: "A blog post description",
      authorName: "Author",
      authorImage: "https://avatar.vercel.sh/author",
      image: "https://illustrations.popsy.co/gray/success.svg"
    };

    if (response.ok) {
      try {
        const fetchedData = await response.json();
        data = { ...data, ...fetchedData };
      } catch (e) {
        console.error("Error parsing OG data:", e);
      }
    }

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '32px',
            }}
          >
            <h1
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#111827',
                lineHeight: '1',
                textAlign: 'center',
                marginBottom: '16px',
              }}
            >
              {data.title}
            </h1>
            <p
              style={{
                fontSize: '18px',
                color: '#6B7280',
                maxWidth: '600px',
                textAlign: 'center',
                marginBottom: '24px',
              }}
            >
              {data.description?.slice(0, 120)}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
              }}
            >
              <img
                src={data.authorImage}
                alt={data.authorName}
                width="48"
                height="48"
                style={{
                  borderRadius: '50%',
                  marginRight: '16px',
                }}
              />
              <p
                style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  color: '#111827',
                }}
              >
                by {data.authorName}
              </p>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 600,
        emoji: "blobmoji",
      },
    );
  } catch (error) {
    console.error("OpenGraph image generation error:", error);
    
    // Fallback simple
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
          }}
        >
          <h1
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#111827',
            }}
          >
            Blog Post
          </h1>
        </div>
      ),
      {
        width: 1200,
        height: 600,
      },
    );
  }
}
