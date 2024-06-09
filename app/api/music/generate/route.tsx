import OpenAI from 'openai'

export async function POST(req: Request) {
  const reqData = await req.formData()
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  const mediaTitle = reqData.get('mediaTitle')
  const tags = []
  for (const pair of reqData.entries()) {
    console.log('pair', pair[0])
    if (pair[0].startsWith('tags[') && pair[0].endsWith(']')) {
      tags.push(pair[1])
    }
  }

  let prompt = `a music cover with title:'${mediaTitle}', and tags:`
  tags.map((tag) => {
    prompt += `'${tag}',`
  })
  const coverImage = await openai.images.generate({
    model: 'dall-e-3',
    prompt,
    quality: 'standard',
    n: 1,
  })

  if (
    coverImage &&
    coverImage.data &&
    coverImage.data[0] &&
    coverImage.data[0].url
  ) {
    const res = await fetch(coverImage.data[0].url)
    const blob = await res.blob()
    const path = coverImage.data[0].url.split('?')[0]
    const fileName = path.substring(path.lastIndexOf('/') + 1)
    reqData.append('coverImageFile', blob, `coverImage-${fileName}`)
  }

  reqData.delete('mediaTitle')
  for (let key of reqData.keys()) {
    if (key.startsWith('tags[')) {
      reqData.delete(key)
    }
  }

  const res = await fetch(process.env.BACK_HOST + '/user/generate', {
    method: 'POST',
    headers: {},
    body: reqData,
  })
  const resData = await res.json()

  return Response.json(resData)
}
