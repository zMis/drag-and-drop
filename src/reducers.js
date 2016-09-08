import {combineReducers} from 'redux';
import JsonData from './data.js';

const initialState = JsonData;


export default function reducer(state = initialState, action = {}) {
  if (!state) return initialState;

  switch (action.type) {
    case 'DROP':
      return {
        ...state,
        data: action.data
      }

    case 'DONE':
      return {
        ...state,
        data: action.payload
      }

    default:
      return state;
  }
}
