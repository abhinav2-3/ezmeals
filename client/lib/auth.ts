import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions, Profile } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { CredentialInput } from "next-auth/providers/credentials";
import axios from "axios";

interface User {
  email: string;
  name: string;
}
interface Account {
  provider: "google";
}

const LOGIN = process.env.LOGIN!;

interface SignInParams {
  user: User | AdapterUser;
  account: Account | null;
  profile?: Profile;
  email?: { verificationRequest?: boolean };
  credentials?: Record<string, CredentialInput>;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }: SignInParams): Promise<string | boolean> {
      if (!user || !user.email || !account) {
        return false;
      }
      await axios.post(LOGIN, {
        email: user.email,
        name: user.name,
      });
      return true;
    },
  },
  secret: process.env.GOOGLE_CLIENT_SECRET,
};
