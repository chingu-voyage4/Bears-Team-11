import * as React from 'react';
import '../styles/ProjectsPage.css';
import { PassedProps, State, Props } from '../types/ProjectsPage.d';
// import { connect } from 'react-redux';
class ProjectsFilter extends React.Component<PassedProps, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sortBy: '',
      roles: '',
      categories: [],
      status: ''
    };
  }

  public onFormChange(e: React.FormEvent<HTMLButtonElement>): void {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  }

  render() {
    return (
      <form className="project-filters">
        <div className="project-filter-dropdown">

          <div className="project-filter-title">
            Sort By:
          </div>

          <div className="project-filter-dropdown-content">
            <div className="radio">
              <input
                type="radio"
                name="sortBy"
                value="All"
                id="project-filter-sortBy-all"
                checked={true}
                onChange={e => this.onFormChange(e)}
              />
              <label htmlFor="project-filter-sortBy-all">All</label>
            </div>

            <div className="radio">
              <input
                type="radio"
                name="sortBy"
                value="Most Viewed"
                id="project-filter-sortBy-MostViewed"
                onChange={e => this.onFormChange(e)}
              />
              <label htmlFor="project-filter-sortBy-MostViewed">Most Viewed</label>
            </div>

            <div className="radio">
              <input
                type="radio"
                name="sortBy"
                value="Newest"
                id="project-filter-sortBy-newest"
                onChange={e => this.onFormChange(e)}
              />
              <label htmlFor="project-filter-sortBy-newest">Newest</label>
            </div>

          </div>
        </div>

        <div className="project-filter-dropdown">
          <div className="project-filter-title">
            Roles:
          </div>

          <div className="project-filter-dropdown-content">
            <div className="radio">
              <input
                type="radio"
                name="roles"
                value="All Roles"
                checked={true}
                id="project-filter-roles-all"
                onChange={e => this.onFormChange(e)}
              />
              <label htmlFor="project-filter-roles-all">All Roles</label>
            </div>

            <div className="radio">
              <input
                type="radio"
                name="roles"
                value="Programmer"
                id="project-filter-roles-programmer"
                onChange={e => this.onFormChange(e)}
              />
              <label htmlFor="project-filter-roles-programmer">Programmer</label>
            </div>

            <div className="radio">
              <input
                type="radio"
                name="roles"
                value="Designer"
                id="project-filter-roles-designer"
                onChange={e => this.onFormChange(e)}
              />
              <label htmlFor="project-filter-roles-designer">Designer</label>
            </div>
          </div>
        </div>

        <div className="project-filter-dropdown">
          <div className="project-filter-title">
            Categories:
          </div>

          <div className="project-filter-dropdown-content">
            <div className="checkbox">
              <input
                type="checkbox"
                name="categories"
                value="All Categories"
                checked={true}
                id="project-filter-cat-all"
                onChange={e => this.onFormChange(e)}
              />
              <label htmlFor="project-filter-cat-all">All Categories</label>
            </div>

            <div className="checkbox">
              <input
                type="checkbox"
                name="categories"
                value="Productivity"
                id="project-filter-cat-productivity"
                onChange={e => this.onFormChange(e)}
              />
              <label htmlFor="project-filter-cat-productivity">Productivity</label>
            </div>

            <div className="checkbox">
              <input
                type="checkbox"
                name="categories"
                value="Designer Tool"
                id="project-filter-cat-designerTool"
                onChange={e => this.onFormChange(e)}
              />
              <label htmlFor="project-filter-cat-designerTool">Designer Tool</label>
            </div>
          </div>
        </div>

        <div className="project-filter-dropdown">
          <div className="project-filter-title">
            Status:
          </div>

          <div className="project-filter-dropdown-content">
            <div className="radio">
              <input
                type="radio"
                name="status"
                value="Active"
                checked={true}
                id="project-filter-status-active"
                onChange={e => this.onFormChange(e)}
              />
              <label htmlFor="project-filter-status-active">Active</label>
            </div>

            <div className="radio">
              <input
                type="radio"
                name="status"
                value="Completed"
                id="project-filter-status-completed"
                onChange={e => this.onFormChange(e)}
              />
              <label htmlFor="project-filter-status-completed">Completed</label>
            </div>
            
            <div className="radio">
              <input
                type="radio"
                name="status"
                value="All Statuses"
                id="project-filter-status-all"
                onChange={e => this.onFormChange(e)}
              />
              <label htmlFor="project-filter-status-all">All</label>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default ProjectsFilter;