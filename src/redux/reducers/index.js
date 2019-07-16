import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

import RootNavigation from './../../navigations/Router';
import auth from './authReducer';
import question from './questionReducer';
import answer from './answerReducer';

const router = createNavigationReducer(RootNavigation);

const appReducer = combineReducers({
  router,
  auth,
  question,
  answer
})

export default appReducer