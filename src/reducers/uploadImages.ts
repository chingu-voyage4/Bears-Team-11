import { UPLOAD_PROJECT_IMAGES } from '../actions/actionTypes';
import { UploadImageAction } from '../types/Redux';

function uploadImagesReducer(
  state: object = {},
  action: UploadImageAction
): object {
  switch (action.type) {
    case UPLOAD_PROJECT_IMAGES:
      return action.data;
    default:
      return state;
  }
}

export default uploadImagesReducer;
