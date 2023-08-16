import NextAuth, { AuthOptions } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

export const authOptions: AuthOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID ?? "",
      clientSecret: process.env.COGNITO_CLIENT_SECRET ?? "",
      issuer: process.env.COGNITO_ISSUER ?? "",
      idToken: true,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    session: async function ({ session, token }) {
      return {
        ...session,
        bearerToken: token.bearerToken ?? session.bearerToken,
        idToken: token.id_token,
      };
    },
    async jwt({ token, account, user, session }) {
      token.bearerToken = account?.id_token ?? token.bearerToken;
      /* console.log(token); */

      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
