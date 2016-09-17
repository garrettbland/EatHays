import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  SET_LISTITEM,
} from '../actions';


export default function loginReducer(state,action){
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {user:{loggedIn:true}});

    case LOGIN_ERROR:
      return Object.assign({}, state, {user:{loginError:true}});

    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {user:{loggedIn:false}});

    case SET_LISTITEM:
      return Object.assign({}, state, {user:{selectedRow:action.payload}});

    default:
      return Object.assign({}, state, {user:{loggedIn:false}});
  }
}
