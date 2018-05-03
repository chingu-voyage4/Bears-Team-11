import { GET_CATEGORIES } from './actionTypes';
import { Dispatch } from 'react-redux';
import apiService from '../utils/apiService';
import { Action } from '../types/Redux';

export type getCategories_fntype = () => (dispatch: Dispatch<Action>) => void;

export function getCategories(): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return apiService.getCategories().then(categories => {
      return dispatch({
        type: GET_CATEGORIES,
        data: categories
      });
    });
  };
}
