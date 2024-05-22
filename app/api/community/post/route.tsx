export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const username = searchParams.get('username')
  console.log('post id :', id)
  const res = await fetch(
    process.env.BACK_HOST + `/community/post?id=${id}&username=${username}`,
    {
      method: 'GET',
      cache: 'no-store',
    }
  )
  const resData = await res.json()
  console.log('post', resData)
  return Response.json(resData)
}
