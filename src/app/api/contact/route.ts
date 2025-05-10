import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();

  console.log('Contact Form Submission:', data);

  return NextResponse.json({ message: 'Form submitted successfully!' });
}