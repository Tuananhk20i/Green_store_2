import { NextRequest, NextResponse } from "next/server"
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

  const result = await sql(`
    SELECT
      AVG(rating) as avg_rating,
      COUNT(*) as total_reviews,
      COUNT(*) FILTER (WHERE rating = 5) as star5,
      COUNT(*) FILTER (WHERE rating = 4) as star4,
      COUNT(*) FILTER (WHERE rating = 3) as star3,
      COUNT(*) FILTER (WHERE rating = 2) as star2,
      COUNT(*) FILTER (WHERE rating = 1) as star1
    FROM product_reviews
    WHERE product_id = $1
  `,[productId])

  return NextResponse.json(result[0])
}