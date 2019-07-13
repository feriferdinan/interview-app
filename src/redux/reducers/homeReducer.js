import * as types from './../types';
import {AsyncStorage} from 'react-native';
const initialState = {
  data: [],
  error: null,
  isLoading: false,
}

function menu(state = initialState, action) {
  switch (action.type) {
    case types.GETMENU:
      return {
        ...state,
        isLoading: true,
      };
      case "GETMENU_PENDING":
        return {
          ...state,
          isLoading: true,
        };
    case "GETMENU_FULFILLED":
      return {
        ...state,
        isLoading: false,
        data:  action.payload.data
      };
    case "GETMENU_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: action.payload.message
      };
    
    default:
      return state
  }
}

export default menu