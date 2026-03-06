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

  const { searchParams } = new URL(req.url)
  const rating = searchParams.get("rating")

  let query = `
    SELECT
      r.id,
      r.rating,
      r.comment,
      r.images,
      r.is_purchased,
      r.created_at,
      u.name
    FROM product_reviews r
    JOIN users u ON r.user_id = u.id
    WHERE r.product_id = $1
  `

  const values: any[] = [productId]

  if (rating) {
    query += ` AND r.rating = $2`
    values.push(rating)
  }

  query += ` ORDER BY r.created_at DESC`

  const reviews = await sql(query, values)

  return NextResponse.json(reviews)
}