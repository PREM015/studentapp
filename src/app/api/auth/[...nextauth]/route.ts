import NextAuth from 'next-auth';
import Cognito from 'next-auth/providers/cognito';

const handler = NextAuth({
  providers: [
    Cognito({
      clientId: process.env.COGNITO_CLIENT_ID!,
      clientSecret: process.env.COGNITO_CLIENT_SECRET!,
      issuer: process.env.COGNITO_ISSUER!,
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      // First login → extract groups from id_token
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
});

export { handler as GET, handler as POST };
