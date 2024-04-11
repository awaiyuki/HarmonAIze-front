export async function GET(req: Request) {

  const res = await fetch(process.env.DB_HOST + '/generate', {
    method: 'GET',
    headers: {
    },
  })

  const data = await res.formData()
  const file = data.get('file')
  
  return new Response(file)
}
