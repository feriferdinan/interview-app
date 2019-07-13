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

export const getMenu = () => ({
  type: types.GETMENU,
  payload: axios({
    method: "GET",
    url: `http://${configs.BASE_URL}:3333/api/v1/questions`,
  })
});


export const answer = () => ({
  type: types.ANSWER,
  payload: axios({
    method: "POST",
    url: `http://${configs.BASE_URL}:3333/api/v1/answer`,
    data: {
      value
    }
  })
});
