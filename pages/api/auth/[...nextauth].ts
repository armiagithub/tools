import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '../../../lib/prisma'
import bcrypt from 'bcryptjs'

export default NextAuth({
  session: { strategy: 'jwt', maxAge: 60 * 60 * 24 * 30 },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({ where: { email: credentials.email } })
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return { id: user.id, email: user.email }
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.email = user.email
      return token
    },
    async session({ session, token }) {
      if (token?.email) session.user.email = token.email
      return session
    }
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true, sameSite: 'lax', path: '/', secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 24 * 30
      }
    }
  }
})
