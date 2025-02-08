# HarmonAIze-front

The frontend part of the project for 2024-1 Capstone Design 2

HarmonAIze generates accompaniment that fits your uploaded music.

## Tech Stack
- **Framework**: Next.js
- **UI Library**: MUI

## Running Development Server

Create the file `.env.local` in the root directory of the project, and fill in as below.

```
NEXTAUTH_URL=http://localhost:3000
BACK_HOST={YOUR_BACKEND_URL}
DB_HOST={YOUR_DB_URL}
OPENAI_API_KEY={YOUR_OPENAI_API_KEY}
```

Then, open a command line interface and run the following commands in the root directory of the project: 
```console
$ npm i
$ npm run dev
```

Connect `http://localhost:3000`

## Features

- Responsive UI
- Glassmorphism
- Optimistic UI for Like Button and Comments
- Pseudo-realtime Processing via Polling
- Music Cover Image Generated Using Dall-E

## Preview(Screenshots)
![preview1](/images/preview1.png)
![preview2](/images/preview2.png)
![preview3](/images/preview3.png)
