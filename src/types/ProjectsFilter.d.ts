export interface ProjectFilterState {
  sortBy?: string;
  roles?: string;
  categories?: string[];
  status?: string;
  tags?: string[];
  searchTerm?: null | string;
}
