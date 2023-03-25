import NextAuth from 'next-auth';
import bcryptjs from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../models/users';
import db from '../../../utils/db';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  callback: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token; 
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session;
    }
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await db.connect();
        const user = await User.findOne({
          email: credentials.email,
        })
        await db.disconnect();
        if (user && bcryptjs.compareSync(credentials.password, user.password)) {
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            image: 'f',
            isAdmin: user.isAdmin
          }
        }
        throw new Error('Invalid email or password');
      }
    })
  ]
})


/*
import NextAuth, { Session } from 'next-auth';
import bcryptjs from 'bcryptjs';
import { CredentialsOptions } from 'next-auth/providers';
import User from '../../../models/users';
import db from '../../../utils/db';

interface Token extends Record<string, unknown> {
  _id?: string;
  isAdmin?: boolean;
}

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id as string;
      if (user?.isAdmin) token.isAdmin = user.isAdmin as boolean;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id as string;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin as boolean;
      return session;
    }
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials: Record<string, string>): Promise<User | null> {
        await db.connect();
        const user = await User.findOne({
          email: credentials.email,
        })
        await db.disconnect();
        if (user && bcryptjs.compareSync(credentials.password, user.password)) {
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            image: 'f',
            isAdmin: user.isAdmin
          } as User
        }
        throw new Error('Invalid email or password');
      }
    } as CredentialsOptions)
  ]
})
*/