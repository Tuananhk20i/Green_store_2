import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const productId = searchParams.get('productId')

  if (!productId) {
    return NextResponse.json({ success: false, error: 'Thiếu productId' })
  }

  try {
    const reviews = await sql`
      SELECT r.*, u.full_name as user_name 
      FROM product_reviews r 
      JOIN users u ON r.user_id = u.id 
      WHERE r.product_id = ${productId}
      ORDER BY r.created_at DESC
    `

    return NextResponse.json({ success: true, data: reviews })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Lỗi lấy đánh giá' })
  }
}

// Gửi đánh giá mới
export async function POST(request: Request) {
  const { productId, userId, rating, comment, images } = await request.json()

  try {
    await sql`
      INSERT INTO product_reviews (product_id, user_id, rating, comment, images)
      VALUES (${productId}, ${userId}, ${rating}, ${comment}, ${images})
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Lỗi gửi đánh giá' })
  }
}