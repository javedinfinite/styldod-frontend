import Actions from '../actionConstants/hackerActionConstants';
import axios from 'axios';
import { getToken } from '../components/auth/auth'

// const base_url = 'http://localhost:4000/styldod/'
const base_url = 'https://jdhacker.herokuapp.com'

const token = 'Bearer '+getToken()

export const getUsersCount = () => {
  return async (dispatch) => {
    dispatch({type: Actions.USERS_COUNT_REQUESTED});
    console.log("count api calling")
    try {
      let response = await axios.get(base_url+'hackers/pagecount',{
        headers: {
          'Authorization':  token
        }
      });
      // console.log(response.data)
      dispatch({
        type: Actions.USERS_COUNT_RECEIVED,
        payload: {count: response.data.count},
      });
    } catch (e) {
      console.log(e)
      dispatch({
        type: Actions.USERS_COUNT_ERROR,
        error: "API to get users count is failed with error : "+e + "Please reload the page "
      });
    }
  };
};

export const getSomeUsers = (page_number) => {
  return async (dispatch) => {
    dispatch({type: Actions.SOME_USERS_REQUESTED});

    console.log("some users calling")

    try {
      let response = await axios.get(base_url+'/hackers/'+page_number,{
        headers: {
          'Authorization':  token
        }
      });
      // console.log(response)
      dispatch({
        type: Actions.SOME_USERS_RECEIVED,
        payload: {someUsers: response.data.users},
      });
    } catch (e) {
      dispatch({
        type: Actions.SOME_USERS_ERROR,
        error: "API to get some users  list is failed with error : "+e + "Please reload the page "
      });
    }
  };
};

export const getUserDetails = (user_id) => {
  return async (dispatch) => {
    dispatch({type: Actions.USER_DETAILS_REQUESTED});

    console.log("from socialAction",user_id)

    try {
      let response = await axios.get(base_url+'hackerDetails/'+user_id,{
        headers: {
          'Authorization':  token
        }
      });
      console.log(response)
      dispatch({
        type: Actions.USER_DETAILS_RECEIVED,
        payload: {userDetails: response.data.users},
      });
    } catch (e) {
      dispatch({
        type: Actions.USER_DETAILS_ERROR,
        error: "API to get   users  details is failed with error : "+e + "Please reload the page ",
      });
    }
  };
};

export const getTopUsers = (number) => {
  return async (dispatch) => {
    dispatch({type: Actions.TOP_USERS_REQUESTED});

    console.log("TOPS users calling")

    try {
      let response = await axios.get(base_url+'/topHackers/'+number,{
        headers: {
          'Authorization':  token
        }
      });
      // console.log(response)
      dispatch({
        type: Actions.TOP_USERS_RECEIVED,
        payload: {topUsers: response.data.users},
      });
    } catch (e) {
      dispatch({
        type: Actions.TOP_USERS_ERROR,
        error: "API to get top users  list is failed with error : "+e + "Please reload the page "
      });
    }
  };
};
