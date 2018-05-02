import * as React from 'react';
import '../styles/ProjectsPage.css';
import { ProjectFilterState } from '../types/ProjectsFilter.d';
import { connect } from 'react-redux';
import { getProjects, searchProjects } from '../actions/projectActions';
import { getTags } from '../actions/tagsActions';
import { getCategories } from '../actions/categoryActions';
import { ProjectPageFilterProps, Store } from '../types/Redux';

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

  public closeAllDropDown(): void {
    var listOfDropdowns = ['categoryFilter', 'tagFilter'];
    listOfDropdowns.map(function(elemById: string) {
      document.getElementById(elemById)!.classList.remove('new-project-show');
    });
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
        var category = {
          category: { $in: this.state.categories }
        };
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
          query = Object.assign({}, query, { lookingFor: ['Programmer'] });
        } else if (this.state.roles === 'Designer') {
          query = Object.assign({}, query, { lookingFor: ['Designer'] });
        }
      }

      if (this.state.status !== '') {
        if (this.state.status === 'Active') {
          query = Object.assign({}, query, { status: true });
        } else if (this.state.status === 'Completed') {
          query = Object.assign({}, query, { status: false });
        }
      }

      console.log(
        'searchResults in projectsFilter=' + this.props.searchResults
      );
      if (this.props.searchResults !== '') {
        console.log('in assigning searchterm');
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
    class FilterByCategoriesComponent extends React.Component<{
      categories: any;
      categoryFilter: any;
    }> {
      render() {
        var categoriesFromStore = this.props.categories!;
        var filterByCategories;
        if (categoriesFromStore instanceof Array) {
          filterByCategories = categoriesFromStore.map(function(
            // tslint:disable-next-line
            category: any,
            index: number
          ) {
            return (
              <div
                className="checkboxContainer"
                key={'categories_filter_' + index}
              >
                <label htmlFor={'categories_filter_id_' + index}>
                  {category.categoryName}
                  <input
                    type="checkbox"
                    name="category"
                    id={'categories_filter_id_' + index}
                    value={category.categoryName}
                    className="filterOptions-categories"
                  />
                  <span className="checkmark" />
                </label>
              </div>
            );
          });
        }
        return (
          <div>
            <input
              className="project-filter-search-input-box"
              type="text"
              placeholder="Search Categories"
              id="categoryFilter"
              onKeyUp={this.props.categoryFilter}
            />
            {filterByCategories}
          </div>
        );
      }
    }

    class FilterByTagsComponent extends React.Component<{
      tags: any;
      tagFilter: any;
    }> {
      render() {
        var tagsFromStore = this.props.tags!;
        var filterByTags;
        if (tagsFromStore instanceof Array) {
          filterByTags = tagsFromStore.map(function(
            // tslint:disable-next-line
            tag: any,
            index: number
          ) {
            return (
              <div className="checkboxContainer" key={'tags_filter_' + index}>
                <label htmlFor={'tags_filter_id_' + index}>
                  {tag.tagName}
                  <input
                    type="checkbox"
                    name="tag"
                    id={'tags_filter_id_' + index}
                    value={tag.tagName}
                    className="filterOptions-tags"
                  />
                  <span className="checkmark" />
                </label>
              </div>
            );
          });
        }
        return (
          <div>
            <input
              className="project-filter-search-input-box"
              type="text"
              placeholder="Search Tags"
              id="tagFilter"
              onKeyUp={this.props.tagFilter}
            />
            {filterByTags}
          </div>
        );
      }
    }

    return (
      <form className="project-filters">
        <div className="project-filter-dropdown">
          <div className="project-filter-title">Sort By:</div>

          <div className="project-filter-dropdown-content">
            <div className="radioContainer">
              <label htmlFor="project-filter-sortBy-all">
                All
                <input
                  type="radio"
                  name="sortBy"
                  value="All"
                  id="project-filter-sortBy-all"
                  className="filterOptions-sortBy"
                />
                <span className="radioCheckmark" />
              </label>
            </div>

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

            <div className="radioContainer">
              <label htmlFor="project-filter-status-all">
                All
                <input
                  type="radio"
                  name="status"
                  value="All Statuses"
                  id="project-filter-status-all"
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
          Clear Filters
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
export default connect(mapStateToProps, {
  getCategories,
  getTags,
  getProjects,
  searchProjects
})(ProjectsFilter);
