export async function POST(req: Request) {
  const { searchParams } = new URL(req.url)
  const postId = searchParams.get('postId')
  const commentId = searchParams.get('commentId')
  const username = searchParams.get('username')
  // const reqData = await req.json()
  const res = await fetch(
    process.env.BACK_HOST +
      `/community/likeComment?postId=${postId}&commentId=${commentId}&username=${username}`,
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
