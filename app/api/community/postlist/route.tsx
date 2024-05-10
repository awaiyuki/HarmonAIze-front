export async function GET(req: Request) {
  const res = await fetch(process.env.BACK_HOST + '/community/postlist', {
    method: 'GET',
    cache: 'no-store',
  })
  let resData = await res.json()
  console.log('postlist', resData)
  return Response.json(resData)
}
