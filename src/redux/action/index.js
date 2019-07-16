import * as types from "../types";
import {Alert,AsyncStorage} from 'react-native';
import config from "../../../config";
    
import axios from 'axios';


export const register = (value) => ({
  type: types.REGISTER,
  payload: axios({
    method: "POST",
    url: `http://${config.BASE_URL}:3333/api/v1/user`,
    data: {
      username: value.username,
      email: value.email,
      phone_number: value.phone_number
    }
  })
});

export const getQuestion = (number) => ({
  type: types.QUESTION,
  payload: axios({
    method: "GET",
    url: `http://${config.BASE_URL}:3333/api/v1/question/${number}`,
  })
});


export const answer = (value) => ({
  type: types.ANSWER,
  payload: axios({
    method: "POST",
    url: `http://${config.BASE_URL}:3333/api/v1/answer`,
    data: {
      user_id: value.user_id,
      question_id: value.question_id,
      answer: value.answer,
      attachment: value.attachment
    }
  })
});
