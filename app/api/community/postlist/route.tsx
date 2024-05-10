export async function GET(req: Request) {
  const res = await fetch(process.env.BACK_HOST + '/community/postlist', {
    method: 'GET',
  })
  const resData = await res.json()
  console.log('postlist', resData)
  return Response.json(resData)
}
