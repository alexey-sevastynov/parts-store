import { Account, NextAuthOptions, Profile } from 'next-auth';
import bcrypt from 'bcryptjs';

import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import User from '@/models/User';

import { JWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),

    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true },
      },

      async authorize(credentials: any) {
        const { email, password } = credentials;

        const user = await signInWithCredentials({ email, password });
        return user;
      },
    }),
  ],
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/errors',
  },
  callbacks: {
    async signIn(params: {
      user: any;
      account: Account | null;
      profile?: Profile;
      email?: { verificationRequest?: boolean };
      credentials?: Record<string, any>;
    }) {
      const { account, profile } = params;
      if (account && account.type === 'oauth' && profile) {
        return await signInWithOAuth({ account, profile });
      }
      return true;
    },

    async jwt({ token, trigger, session }: JWT) {
      if (trigger === 'update') {
        token.user.firstName = session.firstName;
        token.user.lastName = session.lastName;
        token.user.phone = session.phone;
      } else {
        if (token.email) {
          const user = await getUserByEmail({ email: token.email });
          token.user = user;
        }
      }
      if (token.email) {
        const user = await getUserByEmail({ email: token.email });
        token.user = user;
      }

      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      session.user = token.user;

      return session;
    },
  },
};

// _______________________________________________________

async function signInWithOAuth({
  account,
  profile,
}: {
  account: any;
  profile: any;
}) {
  const user = await User.findOne({ email: profile.email });

  if (user) return true;

  const newUser = new User({
    firstName: profile.name ? profile.name.split(' ').slice(0, 2)[0] : '',
    lastName: profile.name ? profile.name.split(' ').slice(0, 2)[1] : '',
    email: profile.email,
    photo: profile.picture,
    phone: '',
    provider: account.provider,
  });

  await newUser.save();

  return true;
}

async function getUserByEmail({ email }: { email: string }) {
  const user = await User.findOne({ email }).select('-password');

  if (!user) throw new Error('Email does not exsist!');

  return { ...user._doc, _id: user._id.toString() };
}

async function signInWithCredentials({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
    // DO NOT change the msg !!! The text of msg bind with '@/puplic/transltion.json'
  }

  const compare = await bcrypt.compare(password, user.password);

  if (!compare) throw new Error('Incorrect password');
  // DO NOT change the msg !!! The text of msg bind with '@/puplic/transltion.json'

  return { ...user._doc, _id: user._id.toString() };
}
