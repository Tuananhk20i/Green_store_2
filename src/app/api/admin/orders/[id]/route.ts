import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { getUserFromToken } from '@/lib/auth-utils'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = getUserFromToken(request)
    
    if (!user) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Authentication required' 
        },
        { status: 401 }
      )
    }

    // Check if user is admin
    const isAdmin = user.role === 'admin'
    
    if (!isAdmin) {
      // Double check in database
      const dbUser = await sql`
        SELECT is_admin FROM users WHERE id = ${user.userId}
      `
      
      if (dbUser.length === 0 || !dbUser[0].is_admin) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Admin access required' 
          },
          { status: 403 }
        )
      }
    }

    const { id } = params
    const orderId = parseInt(id)
    
    const body = await request.json()
    const { action } = body // action can be 'cancel', 'ship', 'deliver', etc.

    if (action === 'cancel') {
      // Update order status to cancelled
      await sql`
        UPDATE orders 
        SET status = 'cancelled',
            cancelled_at = NOW(),
            updated_at = NOW(),
            updated_by = ${user.userId}
        WHERE id = ${orderId}
      `
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid action' 
        },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true
    })
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update order' 
      },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = getUserFromToken(request)
    
    if (!user) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Authentication required' 
        },
        { status: 401 }
      )
    }

    // Check if user is admin
    const isAdmin = user.role === 'admin'
    
    if (!isAdmin) {
      // Double check in database
      const dbUser = await sql`
        SELECT is_admin FROM users WHERE id = ${user.userId}
      `
      
      if (dbUser.length === 0 || !dbUser[0].is_admin) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Admin access required' 
          },
          { status: 403 }
        )
      }
    }

    const { id } = params
    const orderId = parseInt(id)

    // Get order with details
    const orders = await sql`
      SELECT 
        o.*,
        u.name as user_name,
        u.email as user_email
      FROM orders o
      JOIN users u ON o.user_id = u.id
      WHERE o.id = ${orderId}
    `

    if (orders.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Order not found' 
        },
        { status: 404 }
      )
    }

    const order = orders[0]

    // Get order items
    const items = await sql`
      SELECT 
        oi.id,
        oi.qty,
        oi.unit_price,
        oi.total,
        p.id as product_id,
        p.name as product_name
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ${orderId}
    `

    return NextResponse.json({
      success: true,
      data: {
        id: order.id,
        status: order.status,
        subtotal: order.subtotal,
        shipping_fee: order.shipping_fee,
        total: order.total,
        placed_at: order.placed_at,
        paid_at: order.paid_at,
        shipped_at: order.shipped_at,
        delivered_at: order.delivered_at,
        cancelled_at: order.cancelled_at,
        payment_proof_url: order.payment_proof_url,
        shipping_provider: order.shipping_provider,
        tracking_number: order.tracking_number,
        user: {
          id: order.user_id,
          name: order.user_name,
          email: order.user_email
        },
        items: items.map(item => ({
          id: item.id,
          qty: item.qty,
          unit_price: item.unit_price,
          total: item.total,
          product: {
            id: item.product_id,
            name: item.product_name
          }
        }))
      }
    })
  } catch (error) {
    console.error('Error fetching order:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch order' 
      },
      { status: 500 }
    )
  }
}