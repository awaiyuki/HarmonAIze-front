export async function GET(req: Request) {
  const res = await fetch(process.env.DB_HOST + '/music', {
    method: 'GET',
    headers: {},
  })

  const data = await res.json()

  // test with dummy data !

  return new Response(data)
}
