export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')
  const res = await fetch(
    process.env.BACK_HOST + `/community/postlist?username=${username}`,
    {
      method: 'GET',
      cache: 'no-store',
    }
  )
  let resData = await res.json()
  console.log('postlist', resData)
  return Response.json(resData)
}
