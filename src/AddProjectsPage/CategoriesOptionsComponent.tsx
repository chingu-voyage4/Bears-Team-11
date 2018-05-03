import * as React from 'react';

class CategoriesOptionsComponent extends React.Component<{
  categories: any;
  onFormChange: any;
  categoryFilter: any;
}> {
  render() {
    let categoryOptionsComponent: JSX.Element[];
    let categoriesFromStore = this.props.categories!;
    if (categoriesFromStore instanceof Array) {
      categoryOptionsComponent = categoriesFromStore.map(
        (category: any, index: number) => {
          return (
            <input
              key={'categories_' + index}
              type="button"
              name="category"
              value={category.categoryName}
              onClick={this.props.onFormChange}
              className="new-project-dropdown-text"
            />
          );
        }
      );
    }
    return (
      <div>
        <input
          className="search-input-box"
          type="text"
          placeholder="Search Categories"
          id="categorySearch"
          onKeyUp={this.props.categoryFilter}
        />
        {categoryOptionsComponent!}
      </div>
    );
  }
}

export default CategoriesOptionsComponent;
