import * as React from 'react';

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
export default FilterByTagsComponent;
