import { Account } from 'next-auth';
import { JWT } from 'next-auth/jwt';

export const CLIENT_ID: string = process.env.KEYCLOAK_ID!;
export const CLIENT_SECRET: string = process.env.KEYCLOAK_SECRET!;
export const ISSUER_URL: string = process.env.KEYCLOAK_ISSUER!;

export function now(): number {
  return Math.floor(Date.now() / 1000);
}

export interface IAccount extends Account {
  expires_in: number;
  refresh_expires_in: number;
}

export interface IJWT extends JWT {
  access_token_expires_at: number;
  refresh_token_expires_at: number;
  refresh_token: string;
}

export function updateTokenWithAccount(token: JWT, account: IAccount): JWT {
  return {
    ...token,
    access_token: account.access_token,
    refresh_token: account.refresh_token,
    id_token: account.id_token,
    access_token_expires_at: now() + (account.expires_in - 15),
    refresh_token_expires_at: now() + (account.refresh_expires_in - 15),
  };
}

export async function tryRefreshToken(token: IJWT): Promise<JWT> {
  const { access_token_expires_at, refresh_token, refresh_token_expires_at } = token;

  if (access_token_expires_at > now()) return token;

  if (refresh_token_expires_at < now()) throw new Error('Refresh token is expired');

  const tokenUrl = new URL(`${ISSUER_URL}/protocol/openid-connect/token`);

  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token,
      }),
    });

    if (!response.ok) throw new Error('Failed to refresh token');

    const account: IAccount = await response.json();

    return updateTokenWithAccount(token, account);
  } catch (err) {
    console.error(err);

    throw err;
  }
}
