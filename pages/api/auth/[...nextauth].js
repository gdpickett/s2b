import NextAuth from 'next-auth';
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
      secret: process.env.SECRET,
      maxAge: 60 * 60 * 24 * 30,
      
      async encode({ secret, token, maxAge }) {},
      async decode({ secret, token }) {},
    }  
})