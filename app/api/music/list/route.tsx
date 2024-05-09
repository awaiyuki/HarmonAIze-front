export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')

  const res = await fetch(
    process.env.BACK_HOST + '/user/musics?username=' + username,
    {
      method: 'GET',
      headers: {},
    }
  )

  let resData = await res.json()
  if (!resData) {
    resData = null
  }
  // test with dummy data !

  // const data = {
  //   list: [
  //     { id: 1, title: 'music1', progress: 'on progress' },
  //     { id: 2, title: 'ambient1', progress: 'completed' },
  //     { id: 3, title: 'music1', progress: 'completed' },
  //     { id: 4, title: 'ambient1', progress: 'completed' },
  //     { id: 5, title: 'music1', progress: 'completed' },
  //     { id: 6, title: 'ambient1', progress: 'completed' },
  //   ],
  // }
  return Response.json(resData)
}
