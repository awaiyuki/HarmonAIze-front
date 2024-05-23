export async function POST(req: Request) {
  const reqData = await req.formData()
  const res = await fetch(process.env.BACK_HOST + '/user/generate', {
    method: 'POST',
    headers: {},
    body: reqData,
  })

  const resData = await res.json()

  return Response.json(resData)
}
