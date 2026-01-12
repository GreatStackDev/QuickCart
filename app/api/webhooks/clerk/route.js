import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { inngest } from '@/config/inngest';

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error('❌ CLERK_WEBHOOK_SECRET not found');
    return NextResponse. json({ error: 'Webhook secret not configured' }, { status:  500 });
  }

  // Obtener headers de Clerk
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('❌ Missing svix headers');
    return NextResponse.json({ error: 'Missing svix headers' }, { status:  400 });
  }

  // Obtener el body
  const payload = await req.json();
  const body = JSON. stringify(payload);

  // Verificar la firma de Clerk
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;

  try {
    evt = wh.verify(body, {
      'svix-id':  svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('❌ Error verifying webhook:', err);
    return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
  }

  const eventType = evt.type;
  console.log(`📩 Webhook received from Clerk: ${eventType}`);

  try {
    // Enviar evento a Inngest
    if (eventType === 'user. created') {
      await inngest.send({
        name: 'clerk/user.created',
        data: evt.data,
      });
      console.log('✅ Event sent to Inngest:  clerk/user.created');
    }

    if (eventType === 'user.updated') {
      await inngest.send({
        name: 'clerk/user.updated',
        data: evt.data,
      });
      console.log('✅ Event sent to Inngest: clerk/user. updated');
    }

    if (eventType === 'user. deleted') {
      await inngest.send({
        name: 'clerk/user.deleted',
        data: evt.data,
      });
      console.log('✅ Event sent to Inngest: clerk/user.deleted');
    }

    return NextResponse.json({ 
      message: 'Webhook processed and sent to Inngest',
      eventType 
    }, { status: 200 });

  } catch (error) {
    console.error('❌ Error sending event to Inngest:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}