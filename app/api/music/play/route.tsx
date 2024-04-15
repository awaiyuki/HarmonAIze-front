export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')
  const music = searchParams.get('music')

  const res = await fetch(
    process.env.BACK_HOST +
      '/user/music?username=' +
      username +
      '&music=' +
      music,
    {
      method: 'GET',
      headers: {},
    }
  )

  const data = await res.json()

  return new Response(JSON.stringify(data))
}
