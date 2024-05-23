export async function POST(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const username = searchParams.get('username')
  // const reqData = await req.text()
  // console.log(reqData)
  const res = await fetch(
    process.env.BACK_HOST + `/community/likePost?id=${id}&username=${username}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    }
  )
  const resData = await res.json()
  console.log('post', resData)
  return Response.json(resData)
}
