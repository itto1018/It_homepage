import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
} from "firebase/auth";
import { app } from "./client";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google認証
export const signInWithGoogle = async () => {
	try {
		const result = await signInWithPopup(auth, provider);
		return result.user;
	} catch (error) {
		console.error("Google認証エラー:", error);
		throw error;
	}
};

// ログアウト
export const logout = async () => {
	try {
		await signOut(auth);
	} catch (error) {
		console.error("ログアウトエラー:", error);
		throw error;
	}
};

// 現在のユーザーを取得
export const getCurrentUser = () => {
	return auth.currentUser;
};

// 認証状態の監視
export const onAuthStateChanged = (callback: (user: any) => void) => {
	return auth.onAuthStateChanged(callback);
};
