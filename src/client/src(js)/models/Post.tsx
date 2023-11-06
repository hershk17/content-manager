interface Author {
  name: string;
  avatarUrl: string;
}

export interface Post {
  id: string;
  cover: string;
  title: string;
  createdAt: Date;
  view: number;
  comment: number;
  share: number;
  favorite: number;
  author: Author;
}
