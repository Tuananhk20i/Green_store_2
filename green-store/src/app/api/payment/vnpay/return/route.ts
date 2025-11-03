import { NextResponse } from 'next/server';
import { verifyReturnUrl } from '@/lib/vnpay';
import { sql } from '@/lib/db';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = Object.fromEntries(searchParams.entries());
    
    const { isValid, orderId, amount } = verifyReturnUrl(query);
    
    if (!isValid) {
      console.error('[VNPay] Invalid return URL');
      return redirect('/payment/failed');
    }

    const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');
    const isSuccess = vnp_ResponseCode === '00';

    // Update order status
    await sql`
      UPDATE orders 
      SET payment_status = ${isSuccess ? 'PAID' : 'FAILED'},
          status = ${isSuccess ? 'PROCESSING' : 'CANCELLED'},
          paid_amount = ${isSuccess ? amount : 0},
          paid_at = ${isSuccess ? new Date() : null}
      WHERE id = ${Number(orderId)}
    `;

    // Redirect to appropriate page
    return redirect(isSuccess ? '/payment/success' : '/payment/failed');
  } catch (error) {
    console.error('[VNPay Return Error]:', error);
    return redirect('/payment/failed');
  }
}