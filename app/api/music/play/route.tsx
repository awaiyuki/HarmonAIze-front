export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  const res = await fetch(process.env.BACK_HOST + `/user/music?id=${id}`, {
    method: 'GET',
    headers: {},
  })

  const data = await res.text()
  console.log('user/music response')
  console.log(data)
  return new Response(data)
}
