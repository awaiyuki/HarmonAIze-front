# HarmonAIze-front

The frontend part of the project for 2024-1 Capstone Design 2

HarmonAIze generates accompaniment that fits your uploaded music.

## Setup Environment Variables

### For Local

Create the file `.env.local` in root directory of the project, and fill in as below.

```
NEXTAUTH_URL=http://localhost:3000
BACK_HOST={YOUR_BACKEND_URL}
DB_HOST={YOUR_DB_URL}
OPENAI_API_KEY={YOUR_OPENAI_API_KEY}
```

## Running Development Server

```console
$ npm i
$ npm run dev
```

Connect `http://localhost:3000`

## Features

- Glassmorphism
- Optimistic UI for Like Button and Comments
- Pseudo-realtime Processing via Polling
- Music Cover Image Generated Using Dall-E

## Preview(Screenshots)
![preview1](/images/preview1.png)
![preview2](/images/preview2.png)
![preview3](/images/preview3.png)
