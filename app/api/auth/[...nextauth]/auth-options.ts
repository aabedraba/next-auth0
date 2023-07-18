import { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID || "",
      clientSecret: process.env.AUTH0_CLIENT_SECRET || "",
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {

        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          user
        }
      }

      // Access token has expired, try to update it
      return token;
    },
    async session({ session, token }: any) {

      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error

      return session
    }
  }
}
