export interface State {
  name?: string;
  description?: string;
  dueDate?: string;
  team?: string[];
  githubLink?: string;
  mockupLink?: string;
  liveLink?: string;
  lookingFor?: string[];
  status?: string;
  category?: string;
  tags?: string[];
  images?: any;
  contact?: string;
  createdAt?: string;
  creator?: string;
  categoryPlaceholder: string;
  tagPlaceholder: string | string[];
  preview?: any;
  files?: any;
}

export interface Props {}

export interface PassedProps {
  creator?: string;
}
