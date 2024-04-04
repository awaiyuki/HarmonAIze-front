import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest) {
  const formData = await req.json()
  const res = await fetch('/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY!,
    },
    body: JSON.stringify(formData),
  })
 
  const data = await res.json()
 
  return Response.json(data)
}