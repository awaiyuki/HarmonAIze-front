export async function POST(req: Request) {
  const reqData = await req.json()
  console.log(reqData)
  const res = await fetch(process.env.BACK_HOST + '/user/share', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: reqData,
  })
  console.log(await res.json())
}
