import {
  LOADING_TRUE,
  LOADING_FALSE,
} from '../actions';


export default function loadingReducer(state,action){
  switch (action.type) {
    case LOADING_TRUE:
      return Object.assign({}, state, {user:{loading:true}});

    case LOADING_FALSE:
      return Object.assign({}, state, {user:{loading:false}});

    default:
      return Object.assign({}, state, {user:{loading:false}});
  }
}
