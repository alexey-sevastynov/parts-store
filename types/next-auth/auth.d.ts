import NextAuth from 'next-auth';
import { IUser } from '../user';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: IUser;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;

    token: JWT;
    user: User | AdapterUser;
    account: Account | null;
    profile?: Profile | undefined;
    trigger?: 'signIn' | 'signUp' | 'update' | undefined;
    isNewUser?: boolean | undefined;
    session?: any;
  }
}
