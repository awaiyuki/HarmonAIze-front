export async function POST(req: Request) {
  const reqData = await req.formData()
  const reqDataJSON = Object.fromEntries(reqData)
  console.log(reqDataJSON.username)

  // const dupNicknameRes = await fetch(
  //   process.env.BACK_HOST +
  //     '/user/dupNickname?nickname=' +
  //     reqDataJSON.username,
  //   {
  //     method: 'GET',
  //   }
  // )
  // const dupNicknameResData = await dupNicknameRes.text()
  // console.log(dupNicknameResData)

  // const dupIdRes = await fetch(
  //   process.env.BACK_HOST + '/user/dupId?id=' + reqDataJSON.email,
  //   {
  //     method: 'GET',
  //   }
  // )
  // const dupIdResData = await dupIdRes.text()
  // console.log(dupIdResData)

  const bodyData = JSON.stringify({
    id: reqDataJSON.email,
    pw: reqDataJSON.password,
    nickname: reqDataJSON.username,
  })
  console.log(bodyData)
  const res = await fetch(process.env.BACK_HOST + '/user/enroll', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: reqDataJSON.email,
      pw: reqDataJSON.password,
      nickname: reqDataJSON.username,
    }),
  })
  // const resData = await res.json()
  // console.log('signup' + JSON.stringify(resData))

  return Response.json({})
}
