import * as types from './../types';
import { AsyncStorage } from 'react-native';
const initialState = {
  data: [],
  isLoading: false,
  saveId: ''
}

function question(state = initialState, action) {
  switch (action.type) {
    case types.QUESTION:
      return {
        ...state,
        isLoading: false,
      };
     case "QUESTION_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "QUESTION_FULFILLED":
      return {
        ...state,
        isLoading: false,
        data:action.payload.data,
      };
    case "QUESTION_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: action.payload.message
      };

    default:
      return state
  }
}

export default question