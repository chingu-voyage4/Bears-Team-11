import { User } from './User.d';
import { Projects } from './Projects.d';

export interface LoggedInHeaderProps {
  user: User;
  projects: Projects;
  logout: any;
}

export interface LoggedInHeaderState {
  username: String;
}
