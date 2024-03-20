import { IAccount, IJWT, ISSUER_URL, tryRefreshToken, updateTokenWithAccount } from '@/utils/auth';
import { AuthOptions } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID!,
      clientSecret: process.env.KEYCLOAK_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 60,
  },
  jwt: {
    maxAge: 30 * 60,
  },
  callbacks: {
    jwt({ token, account }) {
      if (account) {
        return updateTokenWithAccount(token, account as IAccount);
      }

      return tryRefreshToken(token as IJWT);
    },
    session({ session, token }) {
      return { ...session, accessToken: token.access_token };
    },
  },
  events: {
    async signOut({ token }) {
      const logoutUrl = new URL(`${ISSUER_URL}/protocol/openid-connect/logout`);

      logoutUrl.searchParams.set('id_token_hint', token.id_token as string);

      await fetch(logoutUrl);
    },
  },
};
