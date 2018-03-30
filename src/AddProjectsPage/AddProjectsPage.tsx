import * as React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import '../styles/AddProjectsPage.css';
import { PassedProps, State, Props } from '../types/AddProjectsPage.d';

let testTags = [
  { tagName: 'Chrome Extension', numOfProjects: 10 },
  { tagName: 'Web App', numOfProjects: 20 },
  { tagName: 'Chingu', numOfProjects: 50 },
  { tagName: 'MERN', numOfProjects: 20 },
  { tagName: 'React', numOfProjects: 20 },
  { tagName: 'Mongodb', numOfProjects: 20 },
  { tagName: 'Express', numOfProjects: 20 },
  { tagName: 'NodeJS', numOfProjects: 20 },
  { tagName: 'Portfolio', numOfProjects: 20 },
  { tagName: 'Python', numOfProjects: 20 },
  { tagName: 'Mobile App', numOfProjects: 20 }
];

class AddProjectsPage extends React.Component<PassedProps, State> {
  constructor(props: Props) {
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
      status: '',
      category: '',
      tags: [],
      images: [],
      contact: '',
      creator: '',
      categoryPlaceholder: 'Choose A Category',
      tagPlaceholder: 'Choose Some Tags',
      preview: null,
      files: null
    };
  }

  public toggleCategoryDropdown = (
    e: React.FormEvent<HTMLButtonElement>
  ): void => {
    // toggle show/hide of category dropdown
    e.preventDefault();
    var doc = document.getElementById('new-project-dropdown')!;
    doc.classList.toggle('new-project-show');
  };

  public toggleTagsDropdown = (e: React.FormEvent<HTMLButtonElement>): void => {
    // toggle show/hide of tag dropdown
    e.preventDefault();
    var doc = document.getElementById('new-tags-dropdown')!;
    doc.classList.toggle('new-project-show');
  };

  public onFormChange = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    var { name, value } = e.currentTarget;
    if (name === 'category') {
      // tslint:disable-next-line
      this.setState({ categoryPlaceholder: value } as any);
      this.toggleCategoryDropdown(e);
    } else if (name === 'tags') {
      var arrayOfTags = Object.assign([], this.state.tags);
      if (arrayOfTags.indexOf(value) === -1) {
        arrayOfTags.push(value);
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

  public onTextAreaFormChange(e: React.FormEvent<HTMLTextAreaElement>): void {
    var { name, value } = e.currentTarget;
    // tslint:disable-next-line
    this.setState({ [name]: value } as any);
  }

  public handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
    // this.props.addProject(this.state.email, this.state.password);
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
    let tagOptionsComponent = testTags.map(function(
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

    return (
      <div className="new-project-body">
        <Header />
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
                  <input
                    type="button"
                    name="category"
                    value="Design Tools"
                    onClick={this.onFormChange}
                    className="new-project-dropdown-text"
                  />
                  <input
                    type="button"
                    name="category"
                    value="Developer Tools"
                    onClick={this.onFormChange}
                    className="new-project-dropdown-text"
                  />
                  <input
                    type="button"
                    name="category"
                    value="Fun"
                    onClick={this.onFormChange}
                    className="new-project-dropdown-text"
                  />
                  <input
                    type="button"
                    name="category"
                    value="News & Weather"
                    onClick={this.onFormChange}
                    className="new-project-dropdown-text"
                  />
                  <input
                    type="button"
                    name="category"
                    value="Producitivity"
                    onClick={this.onFormChange}
                    className="new-project-dropdown-text"
                  />
                  <input
                    type="button"
                    name="category"
                    value="Search Tools"
                    onClick={this.onFormChange}
                    className="new-project-dropdown-text"
                  />
                  <input
                    type="button"
                    name="category"
                    value="Shopping"
                    onClick={this.onFormChange}
                    className="new-project-dropdown-text"
                  />
                  <input
                    type="button"
                    name="category"
                    value="Social & Communication"
                    onClick={this.onFormChange}
                    className="new-project-dropdown-text"
                  />
                  <input
                    type="button"
                    name="category"
                    value="Sports"
                    onClick={this.onFormChange}
                    className="new-project-dropdown-text"
                  />
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

export default AddProjectsPage;
