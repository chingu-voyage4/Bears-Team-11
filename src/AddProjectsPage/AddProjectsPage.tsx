import * as React from 'react';
import Footer from '../Footer';
import '../styles/AddProjectsPage.css';
import HeaderContainer from '../HeaderContainer';
import { AddProjectState } from '../types/AddProjectsPage.d';
import { connect } from 'react-redux';
import { addProject } from '../actions/projectActions';
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

    this.state = {
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
      preview: null,
      files: null
    };
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

  public toggleTeamDropdown = (
    e: React.FormEvent<HTMLButtonElement> | React.FormEvent<HTMLInputElement>
  ): void => {
    // toggle show/hide of team dropdown
    e.preventDefault();
    this.props.getAllUsers();
    var doc = document.getElementById('new-team-dropdown')!;
    doc.classList.toggle('new-project-show');
  };

  public onFormChange = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    var { name, value } = e.currentTarget;
    if (name === 'category') {
      var lowercaseCategory = value.toLowerCase();
      // tslint:disable-next-line
      this.setState({ categoryPlaceholder: lowercaseCategory } as any);
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
    // tslint:disable-next-line
    this.setState({ tags: copyOfTagsArray });
  };

  public handleTeamRemoval = (e: React.MouseEvent<HTMLButtonElement>): void => {
    let { value } = e.currentTarget.previousElementSibling as HTMLInputElement;
    var copyOfTeamArray = Object.assign([], this.state.team);
    var indexOfTag = copyOfTeamArray.indexOf(value);
    copyOfTeamArray.splice(indexOfTag, 1);
    // tslint:disable-next-line
    this.setState({ tags: copyOfTeamArray });
  };

  public onTextAreaFormChange(e: React.FormEvent<HTMLTextAreaElement>): void {
    var { name, value } = e.currentTarget;
    // tslint:disable-next-line
    this.setState({ [name]: value } as any);
  }

  public handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
    this.props.addProject({
      name: this.state.name,
      description: this.state.description,
      dueDate: this.state.dueDate,
      team: this.state.team,
      githubLink: this.state.githubLink,
      mockupLink: this.state.mockupLink,
      liveLink: this.state.liveLink,
      lookingFor: this.state.lookingFor,
      status: this.state.status,
      category: this.state.category,
      tags: this.state.tags,
      images: this.state.images,
      contact: this.state.contact,
      creator: this.state.creator,
      files: this.state.files
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

  public handleImageUpload = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    var referenceToThis = this;
    const preview = document.getElementById('new-project-image-preview')!;
    const loaderAnimation = document.getElementById(
      'new-project-image-loader'
    )!;

    function readAndPreview(file: File) {
      var reader = new FileReader();

      var onSuccessAnimationToggle = function() {
        loaderAnimation.classList.toggle('new-project-show');
      };

      reader.addEventListener('loadstart', onSuccessAnimationToggle, false);

      reader.addEventListener(
        'load',
        function() {
          var image = new Image();
          image.title = file.name;
          image.src = reader.result;
          image.width = 130;
          image.height = 70;

          preview.appendChild(image);

          referenceToThis.setState({
            images: Object.assign({}, referenceToThis.state.images, {
              imageSrc: image.src,
              imageTitle: file.name
            })
            // tslint:disable-next-line
          } as any);
        },
        false
      );

      reader.readAsDataURL(file);

      reader.addEventListener('loadend', onSuccessAnimationToggle, false);
    }

    if (this.state.files) {
      for (var i = 0; i < this.state.files.length; i++) {
        readAndPreview(this.state.files[i]);
      }
    }
  };

  render() {
    var referenceToThis = this;

    let tagOptionsComponent;
    let categoryOptionsComponent;
    let teamOptionsComponent;

    let usersFromStore = this.props.allUsers!;
    if (usersFromStore instanceof Array) {
      teamOptionsComponent = usersFromStore.map(function(
        // tslint:disable-next-line
        users: any,
        index: number
      ) {
        return (
          <input
            key={index}
            type="button"
            name="team"
            value={users.username}
            onClick={referenceToThis.onFormChange}
            className="new-project-dropdown-text"
          />
        );
      });
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
            key={index}
            type="button"
            name="category"
            value={category.categoryName}
            onClick={referenceToThis.onFormChange}
            className="new-project-dropdown-text"
          />
        );
      });
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
            key={index}
            type="button"
            name="tags"
            value={tagObject.tagName}
            onClick={referenceToThis.onFormChange}
            className="new-project-dropdown-text"
          />
        );
      });
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
                <input
                  type="text"
                  name="team"
                  id="new-project-team"
                  className="new-project-input"
                  onChange={e => this.onFormChange(e)}
                />
              </div>
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
                {teamOptionsComponent}
              </div>
              <div className="array-of-tags">{chosenTeam}</div>
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
                  {categoryOptionsComponent}
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
                  {tagOptionsComponent}
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
                <div className="checkbox">
                  <input
                    type="checkbox"
                    name="roles"
                    value="Programmer"
                    id="new-project-role-p"
                    onChange={e => this.onFormChange(e)}
                  />
                  <label
                    className="new-project-text"
                    htmlFor="new-project-role-p"
                  >
                    Programmer
                  </label>
                </div>

                <div className="checkbox">
                  <input
                    type="checkbox"
                    name="roles"
                    value="Designer"
                    id="new-project-role-d"
                    onChange={e => this.onFormChange(e)}
                  />
                  <label
                    className="new-project-text"
                    htmlFor="new-project-role-d"
                  >
                    Designer
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
    allUsers: state.allUsers
  };
}
export default connect(mapStateToProps, {
  addProject,
  getAllUsers,
  getCategories,
  getTags
})(AddProjectsPage);
