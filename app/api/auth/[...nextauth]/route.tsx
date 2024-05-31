//@ts-nocheck

import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        return credentials // for test

        const loginData = {
          id: credentials.username,
          pw: credentials.password,
        }
        console.log(loginData)
        const res = await fetch(
          process.env.BACK_HOST +
            '/user/login?id=' +
            loginData.id +
            '&pw=' +
            loginData.pw,
          {
            method: 'GET',
          }
        )
        const user = await res.json()
        if (res.ok && user.success == 'true') {
          return user
        }
        // const dummyUser = {
        //   id: 'd',
        //   password: 'd',
        // }

        // if (
        //   credentials &&
        //   credentials.username == dummyUser.id &&
        //   credentials.password == dummyUser.password
        // ) {
        //   console.log('success')
        //   return credentials
        // }
        // Return null if user data could not be retrieved
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log('jwt', token, user)
      user && (token.user = user)
      return token
    },
    async session({ session, token }) {
      // delete token.user.password
      session.user = token.user
      return session
    },
  },
  pages: {
    signIn: '/',
  },
  session: {
    maxAge: 30 * 24 * 60 * 60,
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
