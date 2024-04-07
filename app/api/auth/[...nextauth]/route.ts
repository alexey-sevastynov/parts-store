import NextAuth, { Account, Profile } from 'next-auth';
import bcrypt from 'bcryptjs';

import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import User from '@/models/User';
import connect from '@/lib/mongodb';

connect();

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),

    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },

      async authorize(credentials: any) {
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error('Wrong credentials');
            }
          } else {
            throw new Error('User not found!');
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  pages: {
    signIn: 'sign-in',
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

    async jwt({ token }: { token: any }) {
      const user = await getUserByEmail({ email: token.email });
      token.user = user;

      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      session.user = token.user;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


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
  });

  await newUser.save();

  return true;
}

async function getUserByEmail({ email }: { email: string }) {
  const user = await User.findOne({ email }).select('-password');

  if (!user) throw new Error('Email does not exsist!');

  return { ...user._doc, _id: user._id.toString() };
}
