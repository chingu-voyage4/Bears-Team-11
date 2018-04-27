import { User } from './User.d';

export interface Props {}

export interface PassedProps {
  user: User;
}

export interface State {
  personal: boolean;
  public: boolean;
  project: boolean;
}
