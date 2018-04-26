import { GET_CATEGORIES } from '../actions/actionTypes';
import { Categories } from '../types/Category';
import { CategoriesState, CategoryAction } from '../types/Redux';

function categoriesReducer(
  state: CategoriesState = {},
  action: CategoryAction
): CategoriesState {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.data as Categories;
    default:
      return state;
  }
}

export default categoriesReducer;
