import NextAuth from 'next-auth';
import connect from '@/lib/mongodb';
import { authOptions } from '@/utils/authOption';

connect();

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
