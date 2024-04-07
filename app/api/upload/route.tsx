
export async function POST(req: Request) {
  const formData = await req.formData();
  const name = formData.get('name')
  console.log('name', name)
  const file = formData.get('file');
  console.log('file', file);
  
  const res = await fetch(process.env.DB_HOST + '/upload', {
    method: 'POST',
    headers: {
    },
    body: JSON.stringify(formData),
  })
 
  const data = await res.json()
  
  // return new Response(file)
  return new Response(file)
}