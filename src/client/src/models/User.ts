export default interface User {
  username: string; // UNIQUE IDENTIFIER
  email: string;
  password: string;
  name: string;
  avatar: string;
  provider: string;
  googleId: string;
  steamId: string;
  facebookId: string;
  twitterId: string;
}
