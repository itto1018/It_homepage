export interface Profile {
	name: string;
	nickname: string;
	bio: string;
	imageUrl: string | null;
	careers: Career[];
}

export interface Career {
	period: string;
	description: string;
}

export const PROFILE_CONSTRAINTS = {
	name: {
		maxLength: 20,
		minLength: 1,
	},
	nickname: {
		maxLength: 10,
	},
	bio: {
		maxLength: 200,
	},
	careers: {
		maxItems: 10,
		description: {
			maxLength: 50,
		},
	},
};
