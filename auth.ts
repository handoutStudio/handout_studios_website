import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// const allowedEmails = [ "handoutstudio@gmail.com", "handoutstudio3@gmail.com", "rpanwala30@gmail.com", "ellis0078@gmail.com",];
const allowedEmails = process.env.ALLOWED_EMAILS?.split(",") ?? [];

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    callbacks: {
        async signIn({ user }) {
            if(!user.email) return false;

            if(allowedEmails.includes(user.email)) return true; // allow login

            return false; // Block again
        },
    },
})