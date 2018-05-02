export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  profileImage?: string;
  password?: string;
  googleId?: string;
  location?: string;
  roles?: string[];
  description?: string;
  techstack?: string[];
  projects?: string[];
  bookmarked?: string[];
  linkedInLink?: string;
  githubLink?: string;
  portfolioLink?: string;
  websiteLink?: string;
  twitterLink?: string;
  blogLink?: string;
}
