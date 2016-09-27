export const LOADING_TRUE = 'LOADING_TRUE';
export const LOADING_FALSE = 'LOADING_FALSE';

export function isLoading(boolean){
  if (boolean === true){
    return {
      type:LOADING_TRUE
    }
  }else{
    return {
      type:LOADING_FALSE
    }
  }
}
