import NextAuth from 'next-auth';
import { NextApiHandler } from 'next';
import connect from '@/lib/mongodb';
import { authOptions } from '@/utils/authOption';

connect();

const handler = NextAuth(authOptions) as NextApiHandler;

export { handler as GET, handler as POST };
