import { Profile, Career, PROFILE_CONSTRAINTS } from "@/types/profile";

// バリデーション用の型
interface ValidationError {
	field: string;
	message: string;
}

export const validateProfile = (data: {
	name: string;
	nickname: string;
	bio: string;
	careers: Career[];
}): ValidationError[] => {
	const errors: ValidationError[] = [];

	// 名前の検証
	if (!data.name.trim()) {
		errors.push({ field: "name", message: "名前は必須項目です" });
	} else if (data.name.length > PROFILE_CONSTRAINTS.name.maxLength) {
		errors.push({
			field: "name",
			message: `名前は${PROFILE_CONSTRAINTS.name.maxLength}文字以内で入力してください`,
		});
	}

	// ニックネームの検証
	if (!data.nickname.trim()) {
		errors.push({ field: "nickname", message: "ニックネームは必須項目です" });
	} else if (data.nickname.length > PROFILE_CONSTRAINTS.nickname.maxLength) {
		errors.push({
			field: "nickname",
			message: `ニックネームは${PROFILE_CONSTRAINTS.nickname.maxLength}文字以内で入力してください`,
		});
	}

	// 自己紹介の検証
	if (data.bio && data.bio.length > PROFILE_CONSTRAINTS.bio.maxLength) {
		errors.push({
			field: "bio",
			message: `自己紹介は${PROFILE_CONSTRAINTS.bio.maxLength}文字以内で入力してください`,
		});
	}

	return errors;
};
