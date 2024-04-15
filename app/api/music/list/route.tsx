export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')

  // const res = await fetch(
  //   process.env.BACK_HOST + '/user/musics?username=' + username,
  //   {
  //     method: 'GET',
  //     headers: {},
  //   }
  // )

  // const data = await res.json()

  // test with dummy data !

  const data = {
    list: [
      { id: 1, title: 'music1', date: '2020/04/20' },
      { id: 2, title: 'ambient1', date: '2020/04/21' },
      { id: 3, title: 'music1', date: '2020/04/20' },
      { id: 4, title: 'ambient1', date: '2020/04/21' },
      { id: 5, title: 'music1', date: '2020/04/20' },
      { id: 6, title: 'ambient1', date: '2020/04/21' },
      { id: 7, title: 'music1', date: '2020/04/20' },
      { id: 8, title: 'ambient1', date: '2020/04/21' },
      { id: 9, title: 'music1', date: '2020/04/20' },
      { id: 10, title: 'ambient1', date: '2020/04/21' },
    ],
  }
  return new Response(JSON.stringify(data))
}
