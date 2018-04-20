import { DOWNLOAD_PROJECT_IMAGE_URLS } from '../actions/actionTypes';
import { UploadImageAction } from '../types/Redux';

function uploadImagesReducer(
  state: object = {},
  action: UploadImageAction
): object {
  switch (action.type) {
    case DOWNLOAD_PROJECT_IMAGE_URLS:
      return action.data;
    default:
      return state;
  }
}

export default uploadImagesReducer;
