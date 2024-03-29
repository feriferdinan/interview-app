import * as types from './../types';
import { AsyncStorage } from 'react-native';
const initialState = {
  data: [],
  error: null,
  field: null,
  isLoading: false,
  saveId: ""
}

function auth(state = initialState, action) {
  switch (action.type) {
    case types.REGISTER:
      return {
        ...state,
        isLoading: false,
      };
    case "REGISTER_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "REGISTER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        saveId: AsyncStorage.setItem('uid', JSON.stringify(action.payload.data.id))
      };
    case "REGISTER_REJECTED":
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      
      };

    default:
      return state
  }
}

export default auth