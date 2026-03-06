import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number(searchParams.get('limit')) || 10
    const page = Number(searchParams.get('page')) || 1
    const offset = (page - 1) * limit

    // Query products with pagination
    const products = await sql`
      SELECT p.*, c.name as category_name, c.slug as category_slug,
        (SELECT json_agg(pi.image_url) FROM product_images pi WHERE pi.product_id = p.id) as gallery
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `

    // Get total count
    const countResult = await sql`SELECT COUNT(*) as total FROM products`
    const total = countResult[0].total

    // Map database fields to frontend format
    const mappedProducts = products.map((product: any) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      brand: product.brand,
      description: product.description,
      price: product.price,
      salePrice: product.sale_price,
      isSale: product.is_sale || false,
      stock: product.stock || 0,
      imageUrl: product.image_url,
      gallery: product.gallery || [],
      category: {
        id: product.category_id,
        name: product.category_name,
        slug: product.category_slug
      }
    }))

    return NextResponse.json({
      success: true,
      data: mappedProducts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
