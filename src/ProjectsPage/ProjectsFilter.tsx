import * as React from 'react';
import '../styles/ProjectsPage.css';
import { ProjectFilterState } from '../types/ProjectsFilter.d';
import { connect, Dispatch } from 'react-redux';
import { getProjects, searchProjects } from '../actions/projectActions';
import { getTags } from '../actions/tagsActions';
import { getCategories } from '../actions/categoryActions';
import { ProjectPageFilterProps, Store, Action } from '../types/Redux';
import FilterByCategoriesComponent from './FilterByCategoriesComponent';
import FilterByTagsComponent from './FilterByTagsComponent';

class ProjectsFilter extends React.Component<
  ProjectPageFilterProps,
  ProjectFilterState
> {
  constructor(props: ProjectPageFilterProps) {
    super(props);
    this.state = {
      sortBy: '',
      roles: '',
      categories: [],
      status: '',
      tags: [],
      searchTerm: this.props.searchResults
    };
  }

  componentWillMount() {
    this.props.getCategories();
    this.props.getTags();
  }

  public toggleDropDown(
    e: React.FormEvent<HTMLButtonElement> | React.FormEvent<HTMLInputElement>,
    elemById: string
  ): void {
    e.preventDefault();
    var doc = document.getElementById(elemById)!;
    doc.classList.toggle('new-project-show');
  }

  public handleOptionRemoval(
    e: React.MouseEvent<HTMLButtonElement>,
    changedState: string,
    copyOfArray: string[]
  ): void {
    let { value } = e.currentTarget.previousElementSibling as HTMLInputElement;
    var index = copyOfArray.indexOf(value);
    copyOfArray.splice(index, 1);
    this.setState({ [changedState]: copyOfArray });
  }

  public filter = (filterId: string, elemByName: string) => {
    var filter, inputOptions;
    filter = (document.getElementById(
      filterId
    )! as HTMLInputElement).value.toUpperCase();
    inputOptions = document.getElementsByName(elemByName) as NodeListOf<
      HTMLInputElement
    >;

    for (var i = 0; i < inputOptions.length; i++) {
      if (inputOptions[i].value.toUpperCase().indexOf(filter) !== -1) {
        inputOptions[i].parentElement!.style.display = '';
      } else {
        inputOptions[i].parentElement!.style.display = 'none';
      }
    }
  };

  public categoryFilter = () => {
    this.filter('categoryFilter', 'category');
  };

  public tagFilter = () => {
    this.filter('tagFilter', 'tag');
  };

  public clearFilters(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    this.setState({
      sortBy: '',
      roles: '',
      categories: [],
      status: '',
      tags: [],
      searchTerm: null
    });
    this.props.getProjects(
      {
        sort: { createdAt: -1 },
        limit: 24
      },
      null
    );
    this.props.searchProjects(null);
    var list = document.getElementsByTagName('input');
    for (var i = 0; i < list.length; i++) {
      list[i].checked = false;
    }
  }

  public submitFilters(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();

    const saveToState = (name: string) => {
      var value: string[] = [];
      var elemList = document.getElementsByClassName('filterOptions-' + name);

      // tslint:disable-next-line
      var elements = [].filter.call(elemList, function(elem: any) {
        return elem.checked;
      });

      if (elements.length === 1) {
        this.setState({ [name]: elements[0].value });
      } else {
        elements.forEach(function(elem: any) {
          value.push(elem.value);
        });
        this.setState({ [name]: value });
      }
    };

    const callNewProjects = () => {
      // create options and query objects
      var options = {};
      var query: object | null = {};

      if (this.state.categories!.length > 0) {
        var category;
        if (this.state.categories!.length === 1) {
          category = {
            category: { $in: [this.state.categories] }
          };
        } else {
          category = {
            category: { $all: this.state.categories }
          };
        }

        query = Object.assign({}, query, category);
      }

      if (this.state.tags !== undefined && this.state.tags!.length > 0) {
        console.log(this.state.tags);
        var tags: any;
        if (this.state.tags!.length === 1) {
          tags = {
            tags: { $in: [this.state.tags] }
          };
        } else {
          tags = {
            tags: { $all: this.state.tags }
          };
        }
        query = Object.assign({}, query, tags);
      }

      if (this.state.sortBy !== '') {
        if (this.state.sortBy === 'Most Viewed') {
          options = Object.assign(
            {},
            {
              sort: { views: 'desc' }
            }
          );
        } else if (this.state.sortBy === 'Newest') {
          options = Object.assign(
            {},
            {
              sort: { createdAt: -1 }
            }
          );
        } else {
          options = Object.assign(
            {},
            {
              sort: { createdAt: -1 }
            }
          );
        }
      }

      if (this.state.roles !== '') {
        if (this.state.roles === 'Programmer') {
          query = Object.assign({}, query, {
            lookingFor: { $in: ['Programmer'] }
          });
        } else if (this.state.roles === 'Designer') {
          query = Object.assign({}, query, {
            lookingFor: { $in: ['Designer'] }
          });
        }
      }

      if (this.state.status !== '') {
        if (this.state.status === 'Active') {
          query = Object.assign({}, query, { status: true });
        } else if (this.state.status === 'Completed') {
          query = Object.assign({}, query, { status: false });
        }
      }

      if (this.props.searchResults !== '') {
        query = Object.assign({}, query, {
          searchTerm: this.props.searchResults
        });
      }

      query = query === {} ? null : query;
      options = options === {} ? { limit: 24, createdAt: -1 } : options;
      console.log('options=' + JSON.stringify(options));
      console.log('query=' + JSON.stringify(query));

      // call new set of projects per filter options
      return this.props.getProjects(options, query);
    };

    async function saveFiltersThenSubmit() {
      // check array of names for any checked items
      var arrayOfNames = ['sortBy', 'roles', 'categories', 'status', 'tags'];
      await arrayOfNames.map((names: string) => {
        saveToState(names);
      });
      callNewProjects();
    }

    saveFiltersThenSubmit();
  }

  render() {
    return (
      <form className="project-filters">
        <div className="project-filter-dropdown">
          <div className="project-filter-title">Sort By:</div>

          <div className="project-filter-dropdown-content">
            <div className="radioContainer">
              <label htmlFor="project-filter-sortBy-MostViewed">
                Most Viewed
                <input
                  type="radio"
                  name="sortBy"
                  value="Most Viewed"
                  id="project-filter-sortBy-MostViewed"
                  className="filterOptions-sortBy"
                />
                <span className="radioCheckmark" />
              </label>
            </div>

            <div className="radioContainer">
              <label htmlFor="project-filter-sortBy-newest">
                Newest
                <input
                  type="radio"
                  name="sortBy"
                  value="Newest"
                  id="project-filter-sortBy-newest"
                  className="filterOptions-sortBy"
                />
                <span className="radioCheckmark" />
              </label>
            </div>
          </div>
        </div>

        <div className="project-filter-dropdown">
          <div className="project-filter-title">Roles:</div>

          <div className="project-filter-dropdown-content">
            <div className="radioContainer">
              <label htmlFor="project-filter-roles-all">
                All Roles
                <input
                  type="radio"
                  name="roles"
                  value="All Roles"
                  id="project-filter-roles-all"
                  className="filterOptions-roles"
                />
                <span className="radioCheckmark" />
              </label>
            </div>

            <div className="radioContainer">
              <label htmlFor="project-filter-roles-programmer">
                Programmer
                <input
                  type="radio"
                  name="roles"
                  value="Programmer"
                  id="project-filter-roles-programmer"
                  className="filterOptions-roles"
                />
                <span className="radioCheckmark" />
              </label>
            </div>

            <div className="radioContainer">
              <label htmlFor="project-filter-roles-designer">
                Designer
                <input
                  type="radio"
                  name="roles"
                  value="Designer"
                  id="project-filter-roles-designer"
                  className="filterOptions-roles"
                />
                <span className="radioCheckmark" />
              </label>
            </div>
          </div>
        </div>

        <div className="project-filter-dropdown">
          <div className="project-filter-title">Categories:</div>
          <button
            className="project-filter-dropdown-btn"
            onClick={e => this.toggleDropDown(e, 'project-filter-category-id')}
          >
            Choose Categories
          </button>
          <div
            id="project-filter-category-id"
            className="project-filter-dropdown-hide project-filter-dropdown-box"
          >
            <FilterByCategoriesComponent
              categories={this.props.categories}
              categoryFilter={this.categoryFilter}
            />
          </div>
        </div>

        <div className="project-filter-dropdown">
          <div className="project-filter-title">Tags:</div>
          <button
            className="project-filter-dropdown-btn"
            onClick={e => this.toggleDropDown(e, 'project-filter-tag-id')}
          >
            Choose Tags
          </button>
          <div
            id="project-filter-tag-id"
            className="project-filter-dropdown-hide project-filter-dropdown-box"
          >
            <FilterByTagsComponent
              tags={this.props.tags}
              tagFilter={this.tagFilter}
            />
          </div>
        </div>

        <div className="project-filter-dropdown">
          <div className="project-filter-title">Status:</div>

          <div className="project-filter-dropdown-content">
            <div className="radioContainer">
              <label htmlFor="project-filter-status-active">
                Active
                <input
                  type="radio"
                  name="status"
                  value="Active"
                  id="project-filter-status-active"
                  className="filterOptions-status"
                />
                <span className="radioCheckmark" />
              </label>
            </div>

            <div className="radioContainer">
              <label htmlFor="project-filter-status-completed">
                Completed
                <input
                  type="radio"
                  name="status"
                  value="Completed"
                  id="project-filter-status-completed"
                  className="filterOptions-status"
                />
                <span className="radioCheckmark" />
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          onClick={e => this.submitFilters(e)}
          className="project-filter-submit-btn"
        >
          Filter Projects
        </button>
        <button
          type="submit"
          onClick={e => this.clearFilters(e)}
          className="project-filter-clear-btn"
        >
          Clear Filters / Search
        </button>
      </form>
    );
  }
}

function mapStateToProps(state: Store) {
  return {
    projects: state.projects,
    categories: state.categories,
    tags: state.tags,
    searchResults: state.searchResults
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    getProjects: (options: object, query: object | null) => {
      return dispatch(getProjects(options, query));
    },
    getCategories: () => {
      return dispatch(getCategories());
    },
    getTags: () => {
      return dispatch(getTags());
    },
    searchProjects: (query: string | null) => {
      return dispatch(searchProjects(query));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsFilter);
