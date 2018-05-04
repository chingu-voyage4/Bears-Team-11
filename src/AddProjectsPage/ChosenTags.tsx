import * as React from 'react';

class ChosenTags extends React.Component<{
  tags: any;
  handleOptionRemoval: any;
}> {
  render() {
    var chosenTags;
    if (!this.props.tags) {
      return null;
    }

    let tags = this.props.tags.slice();

    if (tags.length === 0) {
      chosenTags = null;
    } else {
      chosenTags = tags.map((tagName: string, index: number) => {
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
              onClick={e => this.props.handleOptionRemoval(e, 'tags', tags)}
            >
              X
            </button>
          </div>
        );
      });
    }
    return <div className="array-of-tags">{chosenTags}</div>;
  }
}

export default ChosenTags;
