export async function POST(req: Request) {
  const reqData = await req.formData()
  const res = await fetch(process.env.BACK_HOST + '/user/generate', {
    method: 'POST',
    headers: {},
    body: reqData,
  })

  // const data = await res.formData()
  // console.log('generated data: ' + data)
  // const file = data.get('file')

  return new Response()
}
