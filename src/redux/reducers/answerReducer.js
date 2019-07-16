import * as types from './../types';
import { AsyncStorage } from 'react-native';
const initialState = {
  data: [],
  isLoading: false,
  saveId: ''
}

function answer(state = initialState, action) {
  switch (action.type) {
    case types.ANSWER:
      return {
        ...state,
        isLoading: false,
      };
    case "ANSWER_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "ANSWER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
      };
    case "ANSWER_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: action.payload.message
      };

    default:
      return state
  }
}

export default answer