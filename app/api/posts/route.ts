import { NextResponse } from 'next/server'
import { fetchPosts } from '@/services/graphql'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const after = url.searchParams.get('after') || undefined
  const firstParam = url.searchParams.get('first')
  const first = firstParam ? parseInt(firstParam, 10) : 10

  try {
    const data = await fetchPosts(first, after)
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
