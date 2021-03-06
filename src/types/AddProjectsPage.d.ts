export interface AddProjectState {
  shouldRedirect: boolean;
  projIdRedirect: string;
  _id?: string;
  name?: string;
  description?: string;
  dueDate?: string;
  team?: string[];
  githubLink?: string;
  mockupLink?: string;
  liveLink?: string;
  lookingFor?: string[];
  status?: boolean;
  category?: string;
  tags?: string[];
  images?: any;
  contact?: string;
  createdAt?: string;
  creator?: string;
  categoryPlaceholder: string;
  tagPlaceholder: string | string[];
  teamPlaceholder: string | string[];
  statusPlaceholder: string;
  preview?: any;
  files?: any;
}
