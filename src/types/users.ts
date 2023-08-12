export type UserListType = UserInfo | UserSettings | { header: string };

export interface UserInfo {
  avatar: string;
  title: string;
  subtitle: string;
  country: string;
  score: string;
  address?: string;
}

export interface UserSettings {
  divider: boolean;
  inset: boolean;
}
