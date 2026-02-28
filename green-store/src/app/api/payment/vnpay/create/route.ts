/*import { NextResponse } from 'next/server';
import { createPaymentUrl } from '@/lib/vnpay';
import { getServerSession } from 'next-auth';
import { sql } from '@/lib/db';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      console.error('No session or user ID found:', session);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { orderId, amount, orderInfo } = body;

    if (!orderId || !amount || !orderInfo) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    try {
      // Create VNPay payment URL
      const paymentUrl = createPaymentUrl({
        amount,
        orderInfo,
        orderId: orderId.toString(),
      });

      // Verify payment URL was created successfully
      if (!paymentUrl || !paymentUrl.startsWith('https://')) {
        console.error('Invalid payment URL generated:', paymentUrl);
        return NextResponse.json(
          { error: 'Could not generate valid payment URL' },
          { status: 500 }
        );
      }

      // Update order payment method
      await sql`
        UPDATE orders 
        SET payment_method = 'VNPAY',
            payment_status = 'PENDING'
        WHERE id = ${orderId}
      `;

      // Log successful payment URL creation
      console.log('Generated VNPay payment URL for order:', orderId);
      return NextResponse.json({ paymentUrl });
    } catch (err) {
      console.error('Error generating VNPay payment URL:', err);
      return NextResponse.json(
        { error: 'Could not generate payment URL' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('[Payment Error]:', error);
    return NextResponse.json(
      { error: 'Could not process payment' },
      { status: 500 }
    );
  }
}*/

import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { createPaymentUrl } from '@/lib/vnpay'
import { getUserIdFromToken } from '@/lib/auth-utils'

export async function POST(request: NextRequest) {
  try {
    const { orderId, amount, orderInfo } = await request.json()

    if (!orderId || !amount || !orderInfo) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // ✅ Lấy user từ JWT giống checkout
    const userId = getUserIdFromToken(request)

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    // ✅ Verify order thuộc user
    const orders = await sql`
      SELECT * FROM orders 
      WHERE id = ${orderId} AND user_id = ${userId}
    `

    if (orders.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      )
    }

    // ✅ Tạo VNPay URL
    const paymentUrl = createPaymentUrl({
      amount,
      orderInfo,
      orderId: orderId.toString(),
    })

    if (!paymentUrl || !paymentUrl.startsWith('https://')) {
      return NextResponse.json(
        { success: false, error: 'Failed to generate payment URL' },
        { status: 500 }
      )
    }

    // ✅ Update order payment method
    await sql`
      UPDATE orders
      SET payment_method = 'VNPAY',
          payment_status = 'PENDING',
          updated_at = NOW()
      WHERE id = ${orderId}
    `

    return NextResponse.json({
      success: true,
      paymentUrl,
    })

  } catch (error) {
    console.error('VNPay create error:', error)

    return NextResponse.json(
      { success: false, error: 'Failed to create payment' },
      { status: 500 }
    )
  }
}