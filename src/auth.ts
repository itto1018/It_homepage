import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID!,
			clientSecret: process.env.AUTH_GOOGLE_SECRET!,
		}),
	],
	callbacks: {
		// 必要に応じてコールバックを追加
		async session({ session, token }) {
			// JWT からセッションに情報を渡す
			return session;
		},
		async jwt({ token, user }) {
			// ユーザーがログインするときに JWT に情報を追加
			if (user) {
				token.id = user.id;
			}
			return token;
		},
	},
});
