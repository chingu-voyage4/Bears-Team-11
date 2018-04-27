import { User } from './User';
import { Dispatch } from 'react-redux';
import { Action } from './Redux';
export interface Projects {
  _id: string;
  name?: string;
  creator?: string;
  images?: string[] | null[];
  team?: string[];
  description?: string;
  contact?: string;
  lookingFor?: string[];
  comments?: string | Array<string>; // Need to update all dependents
  createdAt?: number;
  dueDate?: number | any;
  views?: number;
  category?: string;
  status?: boolean;
  upVotes?: number;
  githubLink?: string;
  mockupLink?: string;
  liveLink?: string;
  tags?: string[];
  files?: any;
  mockups?: Array<string>;
}

export type Project = Projects;
// State is used to declare any types in the this.state object
export interface State {}

// Props is to declare any types of props passed in from parent react container
// In this case, there are no props passed in, so its an empty object
export interface Props {
  project: Project;
  index?: number;
  projId: string;
}

export interface EmptyProp {}

export interface ProjectsProps {}

export interface ProjectsState {}
