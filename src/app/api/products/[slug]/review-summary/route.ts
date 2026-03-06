/*import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  // First get product_id from slug
  const productResult = await sql`SELECT id FROM products WHERE slug = ${params.slug}`
  if (productResult.length === 0) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }
  const productId = productResult[0].id

  const result = await sql`
  SELECT 
    AVG(rating) as avg_rating, 
    COUNT(*) as total_reviews 
  FROM product_reviews 
  WHERE product_id = ${productId}
`;

  return NextResponse.json(result[0])
}*/

import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  // 1. Await params
  const { slug } = await params;

  const productResult = await sql`SELECT id FROM products WHERE slug = ${slug}`;
  if (productResult.length === 0) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  const productId = productResult[0].id;

  // 2. Sử dụng Tagged Template để tính toán summary
  const result = await sql`
    SELECT 
      AVG(rating) as avg_rating, 
      COUNT(*) as total_reviews 
    FROM product_reviews 
    WHERE product_id = ${productId}
  `;

  return NextResponse.json(result[0]);
}