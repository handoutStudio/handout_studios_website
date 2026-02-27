import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const allowedEmails = process.env.ALLOWED_EMAILS?.split(",") ?? [];

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        })
    ],
    callbacks: {
        async signIn({ user }) {
            if(!user.email) return false;

            if(allowedEmails.includes(user.email)) return true; // allow login

            return false; // Block again
        },
    },
})