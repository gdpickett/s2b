import NextAuth from 'next-auth';
import { getToken } from "next-auth/jwt"
import FacebookProvider from 'next-auth/providers/facebook'

export default NextAuth({
    providers: [
        // OAuth authentication providers..
        FacebookProvider({
          clientId: process.env.FACEBOOK_ID,
          clientSecret: process.env.FACEBOOK_SECRET
        })
    ],
    secret: process.env.SECRET,
    session: {
      strategy: "jwt",
  
      maxAge: 30 * 24 * 60 * 60, // 30 days
      updateAge: 24 * 60 * 60, // 24 hours
    },
    jwt: {
      // A secret to use for key generation. Defaults to the top-level `secret`.
      secret: process.env.SECRET,
      // The maximum age of the NextAuth.js issued JWT in seconds.
      // Defaults to `session.maxAge`.
      maxAge: 60 * 60 * 24 * 30,
      // You can define your own encode/decode functions for signing and encryption
      // if you want to override the default behavior.
      async encode({ secret, token, maxAge }) {},
      async decode({ secret, token }) {},
    },
    debug: true,
})