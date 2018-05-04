import * as React from 'react';
import Footer from '../Footer/Footer';
import '../styles/AddProjectsPage.css';
import HeaderContainer from '../Header/HeaderContainer';
import { AddProjectState } from '../types/AddProjectsPage.d';
import { connect } from 'react-redux';
import {
  addOrUpdateProject,
  getOneProject,
  getProjects
} from '../actions/projectActions';
import { getAllUsers } from '../actions/userActions';
import { getTags } from '../actions/tagsActions';
import { getCategories } from '../actions/categoryActions';
import { Store, AddProjectProps } from '../types/Redux';
import { Redirect } from 'react-router';
import StatusOptionsComponent from './StatusOptionsComponent';
import ChosenTeam from './ChosenTeam';
import ChosenTags from './ChosenTags';
import TagOptionsComponent from './TagOptionsComponent';
import CategoriesOptionsComponent from './CategoriesOptionsComponent';
import TeamOptionsComponent from './TeamOptionsComponent';

class AddProjectsPage extends React.Component<
  AddProjectProps,
  AddProjectState
> {
  constructor(props: AddProjectProps) {
    super(props);
    this.state = {
      shouldRedirect: false,
      projIdRedirect: '',
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
  }

  componentDidMount() {
    this.props.getCategories();
    this.props.getTags();
    this.props.getAllUsers();

    var id: string;

    var getProjectById = () => {
      return this.props.getOneProject(id);
    };

    var setState = () => {
      var project = this.props.currentProject!;
      return this.setState(
        {
          name: project.name,
          description: project.description,
          dueDate: project.dueDate !== null ? project.dueDate.slice(0, 10) : '',
          team: project.team,
          githubLink: project.githubLink,
          mockupLink: project.mockupLink,
          liveLink: project.liveLink,
          lookingFor: project.lookingFor,
          status: project.status,
          category: project.category,
          tags: project.tags,
          images: project.images,
          contact: project.contact,
          creator: project.creator,
          categoryPlaceholder: 'Choose A Category',
          tagPlaceholder: 'Choose Some Tags',
          teamPlaceholder: 'Add Teammates',
          statusPlaceholder: 'Status of Project',
          preview: null,
          files: null
        },
        () => {
          // console.log(this.state);
          // var doc: any;
          // if (this.state.lookingFor === ['Programmer']) {
          //   doc = document.getElementById('new-project-role-p')!;
          //   doc.checked = true;
          // } else if (this.state.lookingFor === ['Designer']) {
          //   doc = document.getElementById('new-project-role-d')![0];
          //   doc.checked = true;
          // } else if (this.state.lookingFor!.indexOf('Programmer') !== -1
          //   && this.state.lookingFor!.indexOf('Designer') !== -1) {
          //   var d: HTMLInputElement = document.getElementById('new-project-role-d')![0];
          //   var p: HTMLInputElement = document.getElementById('new-project-role-p')![0];
          //   d.checked = true;
          //   p.checked = true;
          // }
        }
      );
    };

    async function callProjectAssignToState() {
      await getProjectById();
      await setState();
    }

    // if there was an ID passed in with the url link
    // call data of that one project
    // update state with requested project data
    if (this.props.match.params.hasOwnProperty('id')) {
      id = this.getURLParams().id;
      callProjectAssignToState();
    }
  }

  getURLParams = () => {
    return this.props.match.params;
  };

  public toggleDropdown = (
    e: React.FormEvent<HTMLButtonElement> | React.FormEvent<HTMLInputElement>,
    elemById: string
  ) => {
    e.preventDefault();
    var doc = document.getElementById(elemById)!;
    doc.classList.toggle('new-project-show');
  };

  public onFormChange = (e: React.FormEvent<HTMLInputElement>): void | null => {
    e.persist();
    var { name, value } = e.currentTarget;

    var saveArrayToState = (stateName: any, array: any, elemById: string) => {
      if (array.includes(value.toLowerCase()) === false) {
        array.push(value.toLowerCase());
        return this.setState({ [stateName]: array }, () => {
          this.toggleDropdown(e, elemById);
        });
      } else {
        this.toggleDropdown(e, elemById);
      }
    };

    if (name === 'category') {
      this.setState({
        category: value,
        categoryPlaceholder: value
      } as any);
      this.toggleDropdown(e, 'new-project-dropdown');
    } else if (name === 'tags') {
      saveArrayToState('tags', this.state.tags!.slice(), 'new-tags-dropdown');
    } else if (name === 'team') {
      saveArrayToState('team', this.state.team!.slice(), 'new-team-dropdown');
    } else if (name === 'status') {
      if (value === 'Active') {
        this.setState({ status: true, statusPlaceholder: value });
      } else {
        this.setState({ status: false, statusPlaceholder: value });
      }
      this.toggleDropdown(e, 'new-status-dropdown');
    } else if (name === 'roles') {
      var arrayOfRoles: string[] = [];
      var nodeList = Array.from(document.getElementsByName('roles'));

      if (document.getElementsByName('roles') === null) {
        this.setState({ lookingFor: [] } as any);
      } else {
        nodeList.forEach(function(node: any) {
          if (node.checked) {
            arrayOfRoles.push(node.value);
          }
        });
        this.setState({ lookingFor: arrayOfRoles } as any);
      }
    } else {
      this.setState({ [name]: value } as any);
    }
  };

  public handleOptionRemoval = (
    e: React.MouseEvent<HTMLButtonElement>,
    stateName: any,
    array: string[]
  ): void => {
    let { value } = e.currentTarget.previousElementSibling as HTMLInputElement;
    var index = array.indexOf(value);
    array.splice(index, 1);
    this.setState({ [stateName]: array });
  };

  public onTextAreaFormChange(e: React.FormEvent<HTMLTextAreaElement>): void {
    var { name, value } = e.currentTarget;
    this.setState({ [name]: value } as any);
  }

  public handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
    var title = document.getElementById('new-project-title') as any;
    var description = document.getElementById('new-project-description') as any;

    if (title.value === '' && description.value === '') {
      alert('Title and Description are required 😉');
      return;
    }

    var elemList = document.getElementsByClassName('new-project-roles');
    var elements = [].filter.call(elemList, function(elem: any) {
      return elem.checked;
    });

    var lookingForArray: string[] = [];
    elements.forEach(function(elem: any) {
      lookingForArray.push(elem.value);
    });

    this.setState({ lookingFor: lookingForArray }, () => {
      var projectToCreateOrUpdate = {
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
        contact: this.state.contact,
        creator: this.props.user.username
      };
      if (this.props.match.params.hasOwnProperty('id')) {
        projectToCreateOrUpdate = Object.assign({}, projectToCreateOrUpdate, {
          _id: this.props.currentProject._id
        });
      }

      this.props
        .addOrUpdateProject(projectToCreateOrUpdate, this.state.files)
        .then(() => {
          this.props
            .getProjects({ sort: { modifiedAt: -1 } }, null)
            .then(() => {
              console.log(this.props.projects);
              this.setState({
                shouldRedirect: true,
                projIdRedirect: this.props.projects[0]._id
              });
            });
        });
    });
  };

  public handleImageText = (e: React.FormEvent<HTMLInputElement>): void => {
    let files = e.currentTarget.files! as FileList;
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
    e.persist();
    this.filter('tagSearch', 'tags');
    if (e.keyCode === 13) {
      var inputValue = (document.getElementById(
        'tagSearch'
      )! as HTMLInputElement).value;
      var array = this.state.tags!.slice();
      if (array.indexOf(inputValue.toLowerCase()) === -1) {
        array.push(inputValue.toLowerCase());
      }
      this.setState({ tags: array }, () => {
        this.toggleDropdown(e, 'new-tags-dropdown');
      });
    }
  };

  public categoryFilter = () => {
    this.filter('categorySearch', 'category');
  };

  public handleImageUpload = (e: React.FormEvent<HTMLButtonElement>): void => {
    // currently makes preview of images
    e.preventDefault();
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
    }
  };

  render() {
    if (this.state.shouldRedirect) {
      return (
        <Redirect
          push={true}
          from="/projects/add"
          to={'/projects/' + this.state.projIdRedirect}
        />
      );
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
                value={this.state.name}
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
                maxLength={360}
                value={this.state.description}
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
                value={this.state.dueDate}
                onChange={e => this.onFormChange(e)}
              />
              <div className="new-project-team">
                <label className="newProjectSubText" htmlFor="new-project-team">
                  Team
                </label>
                <button
                  onClick={e => this.toggleDropdown(e, 'new-team-dropdown')}
                  className="new-project-dropdown-btn"
                >
                  {this.state.teamPlaceholder}
                </button>
                <div
                  id="new-team-dropdown"
                  className="new-project-category-content"
                >
                  <TeamOptionsComponent
                    allUsers={this.props.allUsers}
                    user={this.props.user}
                    onFormChange={this.onFormChange}
                    teamFilter={this.teamFilter}
                  />
                </div>
                <div className="array-of-tags">
                  <ChosenTeam
                    team={this.state.team}
                    handleOptionRemoval={this.handleOptionRemoval}
                  />
                </div>
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
                value={this.state.githubLink}
                onChange={this.onFormChange}
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
                value={this.state.mockupLink}
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
                value={this.state.liveLink}
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
                  onClick={e => this.toggleDropdown(e, 'new-project-dropdown')}
                  className="new-project-dropdown-btn"
                >
                  {this.state.category !== ''
                    ? this.state.category
                    : this.state.categoryPlaceholder}
                </button>
                <div
                  id="new-project-dropdown"
                  className="new-project-category-content"
                >
                  <CategoriesOptionsComponent
                    categories={this.props.categories}
                    onFormChange={this.onFormChange}
                    categoryFilter={this.categoryFilter}
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
                  onClick={e => this.toggleDropdown(e, 'new-tags-dropdown')}
                  className="new-project-dropdown-btn"
                >
                  {this.state.tagPlaceholder}
                </button>
                <div
                  id="new-tags-dropdown"
                  className="new-project-category-content"
                >
                  <TagOptionsComponent
                    formChange={this.onFormChange}
                    tags={this.props.tags}
                    tagFilter={this.tagFilter}
                  />
                </div>
                <ChosenTags
                  tags={this.state.tags}
                  handleOptionRemoval={this.handleOptionRemoval}
                />
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
                Cover Photo
              </label>
              <input
                type="file"
                id="uploadImage"
                accept="image/png, image/jpeg, image/gif"
                name="projectImages"
                className="uploadImageBtn"
                multiple={false}
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
                onClick={e => this.toggleDropdown(e, 'new-status-dropdown')}
                className="new-project-dropdown-btn"
              >
                {this.state.statusPlaceholder}
              </button>
              <div
                id="new-status-dropdown"
                className="new-project-category-content"
              >
                <StatusOptionsComponent onFormChange={this.onFormChange} />
              </div>
            </div>

            <button
              type="button"
              className="new-project-submit-btn"
              onClick={this.handleSubmit}
            >
              Save Project
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
    currentProject: state.addOrUpdateProject
  };
}

export default connect(mapStateToProps, {
  addOrUpdateProject,
  getAllUsers,
  getCategories,
  getTags,
  getOneProject,
  getProjects
})(AddProjectsPage as any);
