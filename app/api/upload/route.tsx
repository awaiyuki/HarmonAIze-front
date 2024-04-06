import {IncomingForm} from 'formidable'

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file');
  console.log('file', file);
  
  // Test with dummy data !
  
  // const res = await fetch('/upload', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //     'API-Key': process.env.DATA_API_KEY!,
  //   },
  //   body: JSON.stringify(formData),
  // })
 
  // const data = await res.json()
 
  return Response.json({})
}