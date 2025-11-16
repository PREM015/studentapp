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
      // Save the Cognito userId (sub field)
      if (account?.id_token) {
        const payload = JSON.parse(
          Buffer.from(account.id_token.split('.')[1], 'base64').toString()
        );
        token.roles = payload['cognito:groups'] || [];
        token.id = payload['sub'];
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.roles = token.roles || [];
        session.user.id = token.id; // 🔵 ADD THIS
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
