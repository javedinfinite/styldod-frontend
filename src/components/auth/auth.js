import jwt_decode from "jwt-decode";
import _ from 'lodash'

export const getToken = () => {

    const tokenString = sessionStorage.getItem('AccessToken');
    const userToken = JSON.parse(tokenString);
    // console.log("from get toke=n....", userToken)
    return userToken ?? ''
};

export const setToken = (token) => {

    console.log("from setToken")
    sessionStorage.setItem('AccessToken', JSON.stringify(token));
}

export const removeToken = (token) => {

    console.log("from removetoken")
    sessionStorage.removeItem('AccessToken');
}

export const checkTokenExpiry = (token) => {

    console.log("from expiry token")
    var decoded = jwt_decode(token);
    var expired = Date.now() >= decoded.exp * 1000
    if(expired)
        sessionStorage.removeItem('AccessToken');
    // console.log('expired..........',expired)
    return expired
     
}

export const checkTokenValidity = () => { // returns true if valid, else return false
        const token = getToken()
        if(_.isEmpty(token))
            return false
        const expired = checkTokenExpiry(token)
        return !expired

}

 

 

 
 