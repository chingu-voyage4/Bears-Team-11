import { GET_CATEGORIES } from './actionTypes';
import { Dispatch } from 'react-redux';
import apiService from '../utils/apiService';
import { Action } from '../types/Redux';
import { Categories } from '../types/Category';

export function getCategories(
  categories: Categories
): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return apiService.getTags().then(category => {
      return dispatch({
        type: GET_CATEGORIES,
        data: category
      });
    });
  };
}
