import * as React from 'react';
import '../styles/Project.css';

class TagCategoryContainer extends React.Component<{ project: any }, {}> {
  render() {
    var data = this.props.project;
    var tags;
    if (data.tags !== undefined && data.tags.length > 0) {
      tags = data.tags.map((tagName: string, index: number) => {
        // var link = '/tag/' + tagName;
        return (
          // <Link to={link} key={index} className="projects-tag-links">
          //   {tagName}
          // </Link>
          <div key={index} className="projects-tag-links">
            {tagName}
          </div>
        );
      });
    }
    return (
      <div className="project-tags">
        <div className="projects-category-links">
          {data.category ? data.category : null}
        </div>
        {data.tags ? tags : null}
      </div>
    );
  }
}

export default TagCategoryContainer;
