export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const REMEMBER_TRUE = 'REMEMBER_TRUE';
export const SET_LISTITEM = 'SET_LISTITEM';

export function login(userCredentials){
  if (userCredentials.userName === 'testuser' && userCredentials.password === '123'){
    return {
      type:LOGIN_SUCCESS
    }
  } else {
    return {
      type:LOGIN_ERROR
    }
  }
}

export function logout(){
  return {
    type:LOGOUT_SUCCESS
  }
}

export function setListItem(rowData){
  return {
    payload:rowData,
    type:SET_LISTITEM
  }
}
