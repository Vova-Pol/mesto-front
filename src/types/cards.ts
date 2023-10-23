import { IUser } from './user';

export interface IUpdateCardsValues {
  cardName: string;
  imageUrl: string;
}

export interface ICard {
  likes: IUser[];
  _id: string;
  name: string;
  link: string;
  owner: IUser;
  createdAt: string;
}
