export async function POST(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const reqData = await req.json()
  const res = await fetch(
    process.env.BACK_HOST + `/community/likePost?id=${id}`,
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
