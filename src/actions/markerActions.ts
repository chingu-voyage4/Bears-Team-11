import {
  ADD_MARKER,
  MOVE_MARKER,
  ADD_COMMENT,
  GET_MARKERS
} from './actionTypes';
import { Dispatch } from 'react-redux';
import { MarkerAction } from '../types/Redux.d';
import { Marker } from '../types/Marker.d';
import apiService from '../utils/apiService';

export function getMarkers(): (dispatch: Dispatch<MarkerAction>) => void {
  return dispatch => {
    return apiService.getMarkers().then(markers => {
      return {
        type: GET_MARKERS,
        data: markers
      };
    });
  };
}

export function addMarker(
  marker: Marker
): (dispatch: Dispatch<MarkerAction>) => void {
  return dispatch => {
    return apiService.saveMarker(marker).then(savedMarker => {
      return {
        type: ADD_MARKER,
        data: savedMarker
      };
    });
  };
}

export function moveMarker(
  id: string,
  x: string,
  y: string,
  width: string,
  height: string
): (dispatch: Dispatch<MarkerAction>) => void {
  return dispatch => {
    return apiService
      .updateMarkerPosition(id, x, y, width, height)
      .then(updatedMarker => {
        return {
          type: MOVE_MARKER,
          data: updatedMarker
        };
      });
  };
}

export function addComment(
  markerId: string,
  comment: {
    user: string;
    time: string;
    message: string;
  }
): (dispatch: Dispatch<MarkerAction>) => void {
  return dispatch => {
    return apiService
      .addMarkerComment(markerId, comment)
      .then(updatedMarker => {
        return {
          type: ADD_COMMENT,
          data: updatedMarker
        };
      });
  };
}
