export interface Contact {
  id: string;
  createdAt: number;
}

export interface ContactProps {
  contact: {
    first: string;
    last: string;
    avatar: string;
    twitter: string;
    notes: string;
    favorite: boolean;
  };
}