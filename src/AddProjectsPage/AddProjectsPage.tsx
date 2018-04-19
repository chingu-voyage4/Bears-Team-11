import * as React from 'react';
import Footer from '../Footer';
import '../styles/AddProjectsPage.css';
import HeaderContainer from '../HeaderContainer';
import { AddProjectState } from '../types/AddProjectsPage.d';
import { connect } from 'react-redux';
import {
  addProject,
  uploadProjectImage,
  updateProject,
  getOneProject
} from '../actions/projectActions';
import { getAllUsers } from '../actions/userActions';
import { getTags } from '../actions/tagsActions';
import { getCategories } from '../actions/categoryActions';
import { Store, AddProjectProps } from '../types/Redux';

class AddProjectsPage extends React.Component<
  AddProjectProps,
  AddProjectState
> {
  constructor(props: AddProjectProps) {
    super(props);
    var emptyState = {
      name: '',
      description: '',
      dueDate: '',
      team: [],
      githubLink: '',
      mockupLink: '',
      liveLink: '',
      lookingFor: [],
      status: true,
      category: '',
      tags: [],
      images: [],
      contact: '',
      creator: '',
      categoryPlaceholder: 'Choose A Category',
      tagPlaceholder: 'Choose Some Tags',
      teamPlaceholder: 'Add Teammates',
      statusPlaceholder: 'Status of Project',
      preview: null,
      files: null
    };

    var projectToUpdate;

    if (this.props.addOrUpdateProject !== null) {
      // triggers a call to replace projectState with oneProject by Id
      this.props.getOneProject(this.props.addOrUpdateProject);
      projectToUpdate = this.props.projects!;
    }

    var filledState = Object.assign({}, projectToUpdate, {
      categoryPlaceholder: 'Choose A Category',
      tagPlaceholder: 'Choose Some Tags',
      teamPlaceholder: 'Add Teammates',
      statusPlaceholder: 'Status of Project',
      preview: null,
      files: null
    });

    this.props.addOrUpdateProject === null
      ? (this.state = emptyState)
      : (this.state = filledState);
  }

  public toggleCategoryDropdown = (
    e: React.FormEvent<HTMLButtonElement> | React.FormEvent<HTMLInputElement>
  ): void => {
    // toggle show/hide of category dropdown
    e.preventDefault();
    this.props.getCategories();
    var doc = document.getElementById('new-project-dropdown')!;
    doc.classList.toggle('new-project-show');
  };

  public toggleTagsDropdown = (
    e: React.FormEvent<HTMLButtonElement> | React.FormEvent<HTMLInputElement>
  ): void => {
    // toggle show/hide of tag dropdown
    e.preventDefault();
    this.props.getTags();
    var doc = document.getElementById('new-tags-dropdown')!;
    doc.classList.toggle('new-project-show');
  };

  public toggleStatusDropdown = (
    e: React.FormEvent<HTMLButtonElement> | React.FormEvent<HTMLInputElement>
  ): void => {
    // toggle show/hide of tag dropdown
    e.preventDefault();
    var doc = document.getElementById('new-status-dropdown')!;
    doc.classList.toggle('new-project-show');
  };

  public toggleTeamDropdown = (
    e: React.FormEvent<HTMLButtonElement> | React.FormEvent<HTMLInputElement>
  ): void => {
    // toggle show/hide of team dropdown
    e.preventDefault();
    this.props.getAllUsers();
    var doc = document.getElementById('new-team-dropdown')!;
    doc.classList.toggle('new-project-show');
  };

  public onFormChange = (e: React.FormEvent<HTMLInputElement>): void | null => {
    e.preventDefault();
    var { name, value } = e.currentTarget;

    if (name === 'category') {
      var lowercaseCategory = value.toLowerCase();
      this.setState({
        category: value,
        categoryPlaceholder: lowercaseCategory
        // tslint:disable-next-line
      } as any);
      this.toggleCategoryDropdown(e);
    } else if (name === 'tags') {
      var arrayOfTags = Object.assign([], this.state.tags);
      var lowercaseTag = value.toLowerCase();
      if (arrayOfTags.indexOf(lowercaseTag) === -1) {
        arrayOfTags.push(lowercaseTag);
      }
      // tslint:disable-next-line
      this.setState({ tags: arrayOfTags } as any);
      this.toggleTagsDropdown(e);
    } else if (name === 'team') {
      var arrayOfTeam = Object.assign([], this.state.team);
      var lowercaseTeam = value.toLowerCase();
      if (arrayOfTeam.indexOf(lowercaseTeam) === -1) {
        arrayOfTeam.push(lowercaseTeam);
      }
      // tslint:disable-next-line
      this.setState({ team: arrayOfTeam } as any);
      this.toggleTeamDropdown(e);
    } else if (name === 'status') {
      if (value === 'Active') {
        this.setState({ status: true, statusPlaceholder: value });
      } else {
        this.setState({ status: false, statusPlaceholder: value });
      }
      this.toggleStatusDropdown(e);
    } else if (name === 'roles') {
      var arrayOfRoles: string[] = [];
      var nodeList = Array.from(document.getElementsByName('roles'));

      if (document.getElementsByName('roles') === null) {
        // tslint:disable-next-line
        this.setState({ lookingFor: [] } as any);
      } else {
        // tslint:disable-next-line
        nodeList.forEach(function(node: any) {
          if (node.checked) {
            arrayOfRoles.push(node.value);
          }
        });
        console.log(arrayOfRoles);
        // tslint:disable-next-line
        this.setState({ lookingFor: arrayOfRoles } as any);
      }
    } else {
      // tslint:disable-next-line
      this.setState({ [name]: value } as any);
    }
  };

  public handleTagRemoval = (e: React.MouseEvent<HTMLButtonElement>): void => {
    let { value } = e.currentTarget.previousElementSibling as HTMLInputElement;
    var copyOfTagsArray = Object.assign([], this.state.tags);
    var indexOfTag = copyOfTagsArray.indexOf(value);
    copyOfTagsArray.splice(indexOfTag, 1);
    this.setState({ tags: copyOfTagsArray });
  };

  public handleTeamRemoval = (e: React.MouseEvent<HTMLButtonElement>): void => {
    let { value } = e.currentTarget.previousElementSibling as HTMLInputElement;
    var copyOfTeamArray = Object.assign([], this.state.team);
    var indexOfTeam = copyOfTeamArray.indexOf(value);
    copyOfTeamArray.splice(indexOfTeam, 1);
    this.setState({ team: copyOfTeamArray });
  };

  public onTextAreaFormChange(e: React.FormEvent<HTMLTextAreaElement>): void {
    var { name, value } = e.currentTarget;
    // tslint:disable-next-line
    this.setState({ [name]: value } as any);
  }

  public handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
    var refToThis = this;
    var elemList = document.getElementsByClassName('new-project-roles');
    // tslint:disable-next-line
    var elements = [].filter.call(elemList, function(elem: any) {
      return elem.checked;
    });

    var lookingForArray: string[] = [];
    // tslint:disable-next-line
    elements.forEach(function(elem: any) {
      lookingForArray.push(elem.value);
    });

    this.setState({ lookingFor: lookingForArray }, function() {
      console.log(refToThis.state);
      refToThis.props.addProject({
        name: refToThis.state.name,
        description: refToThis.state.description,
        dueDate: refToThis.state.dueDate,
        team: refToThis.state.team,
        githubLink: refToThis.state.githubLink,
        mockupLink: refToThis.state.mockupLink,
        liveLink: refToThis.state.liveLink,
        lookingFor: refToThis.state.lookingFor,
        status: refToThis.state.status,
        category: refToThis.state.category,
        tags: refToThis.state.tags,
        images: refToThis.state.images,
        contact: refToThis.state.contact,
        creator: refToThis.props.user.username,
        files: refToThis.state.files
      });
    });
  };

  public handleImageText = (e: React.FormEvent<HTMLInputElement>): void => {
    let files = e.currentTarget.files! as FileList;
    // tslint:disable-next-line
    this.setState({ files: files } as any);
  };

  public handleImageClear = (e: React.FormEvent<HTMLButtonElement>): void => {
    const preview = document.getElementById('new-project-image-preview')!;
    while (preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }
    this.setState({ files: null });
    e.preventDefault();
  };

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
        inputOptions[i].style.display = '';
      } else {
        inputOptions[i].style.display = 'none';
      }
    }
  };

  public teamFilter = () => {
    this.filter('teamSearch', 'team');
  };

  public tagFilter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    this.filter('tagSearch', 'tags');
    if (e.keyCode === 13) {
      var inputValue = (document.getElementById(
        'tagSearch'
      )! as HTMLInputElement).value;
      var arrayOfTags = Object.assign([], this.state.tags);
      var lowercaseTag = inputValue.toLowerCase();
      if (arrayOfTags.indexOf(lowercaseTag) === -1) {
        arrayOfTags.push(lowercaseTag);
      }
      // tslint:disable-next-line
      this.setState({ tags: arrayOfTags } as any);
      this.toggleTagsDropdown(e);
    }
  };

  public categoryFilter = () => {
    this.filter('categorySearch', 'category');
  };

  public handleImageUpload = (e: React.FormEvent<HTMLButtonElement>): void => {
    // currently makes preview of images
    e.preventDefault();
    // var referenceToThis = this;
    const preview = document.getElementById('new-project-image-preview')!;

    function readAndPreview(file: File) {
      var reader = new FileReader();

      reader.addEventListener(
        'load',
        function() {
          var image = new Image();
          image.title = file.name;
          image.src = reader.result;
          image.width = 130;
          image.height = 70;

          preview.appendChild(image);
        },
        false
      );
      reader.readAsDataURL(file);
    }

    if (this.state.files) {
      for (var i = 0; i < this.state.files.length; i++) {
        readAndPreview(this.state.files[i]);
      }
      // upload images to AWS
      this.props.uploadProjectImage(this.state.files);
      // retrieve the sent back image links from this.props.imageLinks and save to state.images
      console.log(this.props.imageLinks);
      this.setState({ images: this.props.imageLinks });
    }
  };

  render() {
    var referenceToThis = this;

    let tagOptionsComponent: JSX.Element[];
    let categoryOptionsComponent: JSX.Element[];
    let teamOptionsComponent: JSX.Element[];
    let statusOptionsComponent;

    let statusOptions = ['Active', 'Completed'];
    statusOptionsComponent = statusOptions.map(function(
      status: string,
      index: number
    ) {
      return (
        <input
          key={'status_' + index}
          type="button"
          name="status"
          value={status}
          onClick={referenceToThis.onFormChange}
          className="new-project-dropdown-text"
        />
      );
    });

    let usersFromStore = this.props.allUsers!;
    let username = this.props.user.username;
    if (usersFromStore instanceof Array) {
      usersFromStore = usersFromStore.filter(
        user => user.username !== username
      );
      teamOptionsComponent = usersFromStore.map(function(
        // tslint:disable-next-line
        users: any,
        index: number
      ) {
        return (
          <input
            key={'users_' + index}
            type="button"
            name="team"
            value={users.username}
            onClick={referenceToThis.onFormChange}
            className="new-project-dropdown-text"
          />
        );
      });
    }

    class TeamOptionsComponent extends React.Component {
      render() {
        return (
          <div>
            <input
              className="search-input-box"
              type="text"
              placeholder="Search for Teammates"
              id="teamSearch"
              onKeyUp={referenceToThis.teamFilter}
            />
            {teamOptionsComponent}
          </div>
        );
      }
    }

    let categoriesFromStore = this.props.categories!;
    if (categoriesFromStore instanceof Array) {
      categoryOptionsComponent = categoriesFromStore.map(function(
        // tslint:disable-next-line
        category: any,
        index: number
      ) {
        return (
          <input
            key={'categories_' + index}
            type="button"
            name="category"
            value={category.categoryName}
            onClick={referenceToThis.onFormChange}
            className="new-project-dropdown-text"
          />
        );
      });
    }

    class CategoriesOptionsComponent extends React.Component {
      render() {
        return (
          <div>
            <input
              className="search-input-box"
              type="text"
              placeholder="Search Categories"
              id="categorySearch"
              onKeyUp={referenceToThis.categoryFilter}
            />
            {categoryOptionsComponent}
          </div>
        );
      }
    }

    let tagsFromStore = this.props.tags!;
    if (tagsFromStore instanceof Array) {
      tagOptionsComponent = tagsFromStore.map(function(
        // tslint:disable-next-line
        tagObject: any,
        index: number
      ) {
        return (
          <input
            key={'tags_' + index}
            type="button"
            name="tags"
            value={tagObject.tagName}
            onClick={referenceToThis.onFormChange}
            className="new-project-dropdown-text"
          />
        );
      });
    }
    class TagOptionsComponent extends React.Component {
      render() {
        return (
          <div>
            <input
              className="search-input-box"
              type="text"
              placeholder="Search / Add Tags"
              id="tagSearch"
              onKeyUp={referenceToThis.tagFilter}
            />
            {tagOptionsComponent}
          </div>
        );
      }
    }

    let chosenTags;
    let tags = Object.assign([], this.state.tags);

    if (tags.length === 0) {
      chosenTags = null;
    } else {
      chosenTags = tags.map(function(tagName: string, index: number) {
        return (
          <div className="tag-container" key={index}>
            <input
              type="button"
              className="new-project-chosen-tag"
              value={tagName}
            />
            <button
              type="button"
              className="remove-tag-btn"
              onClick={referenceToThis.handleTagRemoval}
            >
              X
            </button>
          </div>
        );
      });
    }

    let chosenTeam;
    let team = Object.assign([], this.state.team);
    if (team.length === 0) {
      chosenTeam = null;
    } else {
      if (team.length === 1) {
        chosenTeam = (
          <div className="tag-container" key={1}>
            <input
              type="button"
              className="new-project-chosen-tag"
              value={team}
            />
            <button
              type="button"
              className="remove-tag-btn"
              onClick={referenceToThis.handleTeamRemoval}
            >
              X
            </button>
          </div>
        );
      } else {
        chosenTeam = team.map(function(teamMemeber: string, index: number) {
          return (
            <div className="tag-container" key={index}>
              <input
                type="button"
                className="new-project-chosen-tag"
                value={teamMemeber}
              />
              <button
                type="button"
                className="remove-tag-btn"
                onClick={referenceToThis.handleTeamRemoval}
              >
                X
              </button>
            </div>
          );
        });
      }
    }

    return (
      <div className="new-project-body">
        <HeaderContainer />
        <form className="new-project-container">
          <div className="box-1">
            <div className="box-1-a">
              <label className="newProjectSubText" htmlFor="new-project-title">
                Project Title
              </label>
              <input
                type="text"
                name="name"
                id="new-project-title"
                className="new-project-input"
                onChange={e => this.onFormChange(e)}
              />

              <label
                className="newProjectSubText"
                htmlFor="new-project-description"
              >
                Description
              </label>
              <textarea
                name="description"
                id="new-project-description"
                className="new-project-textarea"
                onChange={e => this.onTextAreaFormChange(e)}
              />

              <label
                className="newProjectSubText"
                htmlFor="new-project-dueDate"
              >
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                id="new-project-dueDate"
                className="new-project-input"
                onChange={e => this.onFormChange(e)}
              />
              <div className="new-project-team">
                <label className="newProjectSubText" htmlFor="new-project-team">
                  Team
                </label>
                <button
                  onClick={this.toggleTeamDropdown}
                  className="new-project-dropdown-btn"
                >
                  {this.state.teamPlaceholder}
                </button>
                <div
                  id="new-team-dropdown"
                  className="new-project-category-content"
                >
                  <TeamOptionsComponent />
                </div>
                <div className="array-of-tags">{chosenTeam}</div>
              </div>
            </div>{' '}
            {/* end of box 1 A */}
            <div className="box-1-b">
              <label
                className="newProjectSubText"
                htmlFor="new-project-githubLink"
              >
                Github Link
              </label>
              <input
                type="text"
                name="githubLink"
                id="new-project-githubLink"
                className="new-project-input"
                onChange={e => this.onFormChange(e)}
              />

              <label
                className="newProjectSubText"
                htmlFor="new-project-mockupLink"
              >
                Mockup Link
              </label>
              <input
                type="text"
                name="mockupLink"
                id="new-project-mockupLink"
                className="new-project-input"
                onChange={e => this.onFormChange(e)}
              />

              <label
                className="newProjectSubText"
                htmlFor="new-project-liveLink"
              >
                Live Link
              </label>
              <input
                type="text"
                name="liveLink"
                id="new-project-liveLink"
                className="new-project-input"
                onChange={e => this.onFormChange(e)}
              />

              <div className="new-project-category">
                <label
                  className="newProjectSubText"
                  htmlFor="new-project-dropdown"
                >
                  Category
                </label>
                <button
                  onClick={this.toggleCategoryDropdown}
                  className="new-project-dropdown-btn"
                >
                  {this.state.categoryPlaceholder}
                </button>
                <div
                  id="new-project-dropdown"
                  className="new-project-category-content"
                >
                  <CategoriesOptionsComponent />
                </div>
              </div>

              <div className="new-project-tags">
                <label
                  className="newProjectSubText"
                  htmlFor="new-tags-dropdown"
                >
                  Tags
                </label>
                <button
                  onClick={this.toggleTagsDropdown}
                  className="new-project-dropdown-btn"
                >
                  {this.state.tagPlaceholder}
                </button>
                <div
                  id="new-tags-dropdown"
                  className="new-project-category-content"
                >
                  <TagOptionsComponent />
                </div>
                <div className="array-of-tags">{chosenTags}</div>
              </div>
            </div>{' '}
            {/* end of box 1 B */}
          </div>{' '}
          {/* end of box 1 */}
          <div className="box-2">
            <div className="new-project-max-width new-project-lookingFor">
              <label
                className="newProjectSubText"
                htmlFor="new-project-lookingFor"
              >
                Looking For
              </label>

              <div className="new-project-checkbox-container">
                <div className="checkboxContainer">
                  <label
                    className="new-project-text"
                    htmlFor="new-project-role-p"
                  >
                    Programmer
                    <input
                      className="new-project-roles"
                      type="checkbox"
                      name="roles"
                      value="Programmer"
                      id="new-project-role-p"
                    />
                    <span className="checkmark" />
                  </label>
                </div>

                <div className="checkboxContainer">
                  <label
                    className="new-project-text"
                    htmlFor="new-project-role-d"
                  >
                    Designer
                    <input
                      className="new-project-roles"
                      type="checkbox"
                      name="roles"
                      value="Designer"
                      id="new-project-role-d"
                    />
                    <span className="checkmark" />
                  </label>
                </div>
              </div>
            </div>

            <div className="new-project-max-width new-project-upload">
              <label className="newProjectSubText" htmlFor="uploadImage">
                Upload Images
              </label>
              <input
                type="file"
                id="uploadImage"
                accept="image/png, image/jpeg, image/gif"
                name="projectImages"
                className="uploadImageBtn"
                multiple={true}
                onChange={this.handleImageText}
              />
              <button
                className="upload-img-btn"
                type="submit"
                onClick={this.handleImageUpload}
              >
                Upload Images
              </button>
              <button
                className="upload-img-delete-btn"
                type="submit"
                onClick={this.handleImageClear}
              >
                Clear Images
              </button>

              <div id="new-project-image-loader">{this.state.preview}</div>
              <div id="new-project-image-preview">
                {/* image preview container */}
              </div>
            </div>

            <div className="new-project-status">
              <label className="newProjectSubText" htmlFor="new-project-status">
                Status
              </label>
              <button
                onClick={this.toggleStatusDropdown}
                className="new-project-dropdown-btn"
              >
                {this.state.statusPlaceholder}
              </button>
              <div
                id="new-status-dropdown"
                className="new-project-category-content"
              >
                {statusOptionsComponent}
              </div>
            </div>

            <button
              type="button"
              className="new-project-submit-btn"
              onClick={this.handleSubmit}
            >
              Submit New Project
            </button>
          </div>
          {/* end of box 2 */}
        </form>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state: Store) {
  return {
    user: state.user,
    projects: state.projects,
    categories: state.categories,
    tags: state.tags,
    allUsers: state.allUsers,
    imageLinks: state.imageLinks,
    addOrUpdateProject: state.addOrUpdateProject
  };
}
export default connect(mapStateToProps, {
  addProject,
  getAllUsers,
  getCategories,
  getTags,
  uploadProjectImage,
  updateProject,
  getOneProject
})(AddProjectsPage);
