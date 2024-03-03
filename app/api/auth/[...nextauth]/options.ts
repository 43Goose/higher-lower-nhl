import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';
import { connectDB } from '@/app/lib/mongodb';
import { User } from '@/app/lib/models/user';
const bcrypt = require('bcrypt');

export const options: NextAuthOptions = {       // Options object for next-auth
    pages: {
        signIn: '/dashboard/login',             // Assigns custom login page for the next-auth signin page
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',                                                                    // name of the credentials provider (custom is just 'Credentials')
            credentials: {
                username: { label: 'Username', type: 'text' },                                      // defines the username input for the signin page (only used if custom login isn't available)
                password: { label: 'Password', type: 'password' }                                   // defines the password input for the signin page
            },
            async authorize(credentials, req) {                                                     // authorize function for when user submits credentials
                try {
                    await connectDB();                                                              // Checks for matching user and compares hashed password
                    const user = await User.findOne({ username: credentials?.username });
                    const authed = await bcrypt.compare(credentials?.password, user.password);

                    return user && authed ? user : null;                                            // returns null if no user found or passwords dont match
                } catch (error) {
                    return null;
                }
            }
        })
    ]
}