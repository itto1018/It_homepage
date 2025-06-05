export interface Career {
  period: string;
  description: string;
}

export interface ProfileInput {
  id?: string;
  name: string;
  nickname?: string;
  bio?: string;
  imageUrl?: string | null;
  careers?: Career[];
}

// サーバーサイドのデータ型
export interface Profile {
  id?: string;
  name: string;
  nickname: string;
  bio: string;
  imageUrl?: string;
  careers: Career[];
  createdAt?: Date;
  updatedAt?: Date;
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
