import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { posts, sites, users } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain');
    const slug = searchParams.get('slug');

    if (!domain || !slug) {
      return NextResponse.json({ error: 'Missing domain or slug' }, { status: 400 });
    }

    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
    if (!rootDomain) {
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
    }

    const subdomain = domain.endsWith(`.${rootDomain}`)
      ? domain.replace(`.${rootDomain}`, "")
      : null;

    const result = await db
      .select({
        title: posts.title,
        description: posts.description,
        image: posts.image,
        authorName: users.name,
        authorImage: users.image,
      })
      .from(posts)
      .innerJoin(sites, eq(posts.siteId, sites.id))
      .innerJoin(users, eq(sites.userId, users.id))
      .where(
        and(
          subdomain
            ? eq(sites.subdomain, subdomain)
            : eq(sites.customDomain, domain),
          eq(posts.slug, slug)
        )
      )
      .limit(1);

    const data = result[0];

    if (!data) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({
      title: data.title || 'Blog Post',
      description: data.description || 'A blog post description',
      authorName: data.authorName || 'Author',
      authorImage: data.authorImage || 'https://avatar.vercel.sh/author',
      image: data.image || 'https://illustrations.popsy.co/gray/success.svg'
    });

  } catch (error) {
    console.error('Error fetching OG data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}