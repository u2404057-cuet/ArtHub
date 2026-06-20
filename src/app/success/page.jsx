import { redirect } from 'next/navigation';
import Link from 'next/link';
import { stripe } from '../../lib/stripe';

import { MongoClient, ObjectId } from 'mongodb';

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)');
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items']
  });

  const { status, customer_details } = session;
  const customerEmail = customer_details?.email;

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete') {
    // Determine plan type from the Price ID
    const lineItems = session.line_items?.data || [];
    const priceId = lineItems[0]?.price?.id;
    const planName = priceId === 'price_1TkM043r2bTEFkmmtLTzhJ0X' ? 'premium' : 'pro';

    // Retrieve user identification from metadata / client_reference_id
    const userId = session.client_reference_id || session.metadata?.userId;

    if (userId || customerEmail) {
      const client = new MongoClient(process.env.MONGO_URI);
      await client.connect();
      const db = client.db("ArtHub");

      const query = {};
      if (userId) {
        try {
          query._id = new ObjectId(userId);
        } catch (e) {
          query._id = userId;
        }
      } else {
        query.email = customerEmail;
      }

      await db.collection("user").updateOne(
        query,
        { $set: { plan: planName } }
      );
      await client.close();
    }
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-[#F7F4EF] px-4 py-12">
        <div className="max-w-md w-full bg-[#EDE9E1] border border-[#D6CFC4] rounded-[12px] p-8 text-center shadow-[0_4px_24px_rgba(30,30,30,0.06)] font-['DM_Sans']">
          
          {/* Animated Success Circle Icon */}
          <div className="mx-auto w-16 h-16 bg-[#C2693F]/10 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-[#C2693F]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#1E1E1E] mb-3">
            Subscription Confirmed!
          </h1>

          {/* Subtext info */}
          <p className="text-sm text-[#6B6560] leading-relaxed mb-6">
            We appreciate your business! A confirmation email has been dispatched to{' '}
            <strong className="text-[#1E1E1E] font-medium">{customerEmail}</strong>.
          </p>

          <div className="border-t border-[#D6CFC4] pt-6 mb-8 text-xs text-[#6B6560]">
            <p>
              If you have any questions or require custom assistance, feel free to email our curation team at{' '}
              <a href="mailto:support@arthub.com" className="text-[#C2693F] hover:underline font-medium">
                support@arthub.com
              </a>.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/dashboard/user"
              className="w-full h-11 inline-flex items-center justify-center bg-[#C2693F] text-[#F7F4EF] text-sm font-semibold rounded-[6px] hover:bg-[#A3522E] transition-colors duration-200"
            >
              Go to Dashboard
            </Link>
            
            <Link
              href="/artworks"
              className="w-full h-11 inline-flex items-center justify-center border border-[#D6CFC4] bg-transparent text-[#1E1E1E] text-sm font-medium rounded-[6px] hover:bg-[#F7F4EF] hover:border-[#1E1E1E] transition-colors duration-200"
            >
              Browse Artworks
            </Link>
          </div>
        </div>
      </div>
    );
  }
}