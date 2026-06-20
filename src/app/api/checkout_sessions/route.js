import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'

import { auth } from '@/lib/auth'

export async function POST(req) {
  try {
    const formData = await req.formData()
    const priceId = formData.get('priceId') || 'price_1TkLaS3r2bTEFkmmoN8FZVnl'
    const headersList = await headers()
    const origin = headersList.get('origin')

    // Fetch user session to bind this Stripe payment to the correct account
    let userSession = null;
    try {
      userSession = await auth.api.getSession({
        headers: headersList,
      });
    } catch (e) {
      console.error("Failed to get session during checkout session creation:", e);
    }

    const userId = userSession?.user?.id;
    const userEmail = userSession?.user?.email;

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      client_reference_id: userId,
      metadata: {
        userId: userId || "",
        userEmail: userEmail || "",
      },
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard/user`,
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}