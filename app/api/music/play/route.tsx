export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')
  const music = searchParams.get('music')

  console.log(username, music)
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
  console.log('user/music response')
  console.log(data)
  return new Response(JSON.stringify(data))
}
