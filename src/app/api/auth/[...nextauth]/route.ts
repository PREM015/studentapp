// src/app/api/auth/[...nextauth]/route.ts

import NextAuth, { type NextAuthOptions } from 'next-auth';
import Cognito from 'next-auth/providers/cognito';

export const authOptions: NextAuthOptions = {
  providers: [
    Cognito({
      clientId: process.env.COGNITO_CLIENT_ID!,
      clientSecret: process.env.COGNITO_CLIENT_SECRET!,
      issuer: process.env.COGNITO_ISSUER!,
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      if (account?.id_token) {
        const payload = JSON.parse(
          Buffer.from(account.id_token.split('.')[1], 'base64').toString()
        );

        token.roles = payload['cognito:groups'] || [];
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).roles = token.roles || [];
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
