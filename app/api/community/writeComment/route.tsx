export async function POST(req: Request) {
  const { searchParams } = new URL(req.url)
  const postId = searchParams.get('postId')
  const reqData = await req.json()
  console.log('write comment: ', reqData)
  const res = await fetch(
    process.env.BACK_HOST + `/community/writeComment?postId=${postId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqData),
    }
  )
  const resData = await res.json()
  console.log('post', resData)
  return Response.json(resData)
}
