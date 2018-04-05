export interface User {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password?: string;
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
