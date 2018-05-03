import * as React from 'react';

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
          <div className="checkboxContainer" key={'categories_filter_' + index}>
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

export default FilterByCategoriesComponent;
