export interface TestProjectObject {
  name: string;
  creator: string;
  link: string;
  image: string;
  teamMembers: string[];
  description: string;
  contact: string;
  lookingFor: string[];
  comments: string;
  createdAt: number;
  dueDate: number;
  views: number;
  category: string;
  status: boolean;
  upVotes: number;
}

export type Project = TestProjectObject;

// State is used to declare any types in the this.state object
export interface State {}

// Props is to declare any types of props passed in from parent react container
// In this case, there are no props passed in, so its an empty object
export interface Props {
  project: TestProjectObject;
}

export interface EmptyProp {}

export interface ProjectsProps {}

export interface ProjectsInheritedProps {
  count: number;
}
export interface ProjectsState {}
