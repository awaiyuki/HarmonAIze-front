export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const res = await fetch(process.env.BACK_HOST + '/community/post?id=' + id, {
    method: 'GET',
  })
  const resData = await res.json()
  console.log('post', resData)
  return Response.json(resData)
}
