export interface IUser {
  name: string;
  about: string;
  avatar: string;
  _id: string;
  cohort: string;
}

export interface IUpdateAvatarValues {
  avatar: string;
}

export interface IUpdateUserProfileValues {
  name: string;
  about: string;
}
