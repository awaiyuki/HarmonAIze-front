export async function POST(req: Request) {
  const reqData = await req.formData()
  const reqDataJSON = Object.fromEntries(reqData)
  console.log(reqDataJSON)

  const res = await fetch(process.env.BACK_HOST + '/user/enroll', {
    method: 'POST',
    headers: {},
    body: {
      id: reqDataJSON.email,
      pw: reqDataJSON.password,
      username: reqDataJSON.username,
    },
  })
  const resData = await res.json()
  console.log(resData)

  return Response.json({ resData })
}
