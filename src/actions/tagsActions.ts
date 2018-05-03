import { GET_TAGS } from './actionTypes';
import { Dispatch } from 'react-redux';
import apiService from '../utils/apiService';
import { Action } from '../types/Redux';

export type getTags_fntype = () => (dispatch: Dispatch<Action>) => void;

export function getTags(): (dispatch: Dispatch<Action>) => void {
  return dispatch => {
    return apiService.getTags().then(tags => {
      return dispatch({
        type: GET_TAGS,
        data: tags
      });
    });
  };
}
