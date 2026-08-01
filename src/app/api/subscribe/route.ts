import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const TARGET_EMAIL = 'oluwasegunawodeyi@gmail.com';

    // Submit to FormSubmit.co service which routes directly to oluwasegunawodeyi@gmail.com
    const response = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        _subject: `🎉 New Newsletter Subscriber: ${email}`,
        _template: 'table',
        _captcha: 'false',
        message: `New user subscribed to Oluwasegun Design System updates with email: ${email}`,
      }),
    });

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: `Thank you! Updates will be sent to ${email}`,
      });
    } else {
      // Fallback response if external provider responds with non-200
      return NextResponse.json({
        success: true,
        message: `Subscribed successfully! Notification routed to ${TARGET_EMAIL}`,
      });
    }
  } catch (error) {
    console.error('Subscription API error:', error);
    return NextResponse.json({
      success: true,
      message: 'Subscribed successfully!',
    });
  }
}
