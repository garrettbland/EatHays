import {
  SET_FILTER,
} from '../actions';

export default function setFilter(state,action){
  switch (action.type) {
    case SET_FILTER:
      return Object.assign({}, state, {user:{filter:action.filter}});
    default:
      return Object.assign({}, state, {user:{filter:"All"}});
  }
}
