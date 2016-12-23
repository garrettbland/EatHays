export const SET_FILTER = 'SET_FILTER';

export function setFilterValue(value){
    return {
      type:SET_FILTER,
      filter:value
    }
}
