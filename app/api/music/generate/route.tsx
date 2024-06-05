import OpenAI from 'openai'

export async function POST(req: Request) {
  const reqData = await req.formData()
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const coverImage = await openai.images.generate({
    model: 'dall-e-3',
    prompt: 'a music cover with a cat',
    quality: 'standard',
    n: 1,
  })
  console.log(coverImage.data)
  const res = await fetch(process.env.BACK_HOST + '/user/generate', {
    method: 'POST',
    headers: {},
    body: reqData,
  })

  const resData = await res.json()

  return Response.json(resData)
}
