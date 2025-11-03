import { NextResponse } from 'next/server';
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
}