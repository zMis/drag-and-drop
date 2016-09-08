import {combineReducers} from 'redux';
import JsonData from './data.js';

const initialState = {
    data: JsonData
};


export default function reducer(state = initialState, action = {}) {
let idBlock;
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

    case 'ADD_MODULE':
        idBlock = action.payload.id_block
        return {
            ...state,
            data: {
                ...state.data,
                blocks: [
                    ...state.data.blocks.slice(0, idBlock),
                    {
                        ...state.data.blocks[idBlock],
                        moduls: [
                            ...state.data.blocks[idBlock].moduls,
                            action.payload.newModule
                        ]
                    },
                    ...state.data.blocks.slice(idBlock + 1)
                ]
            }
        }

        case 'DELETE_MODULE':
        idBlock = action.payload.id_block
        let idModule = action.payload.id_module
        return {
            ...state,
            data: {
                ...state.data,
                blocks: [
                    ...state.data.blocks.slice(0, idBlock),
                    {
                        ...state.data.blocks[idBlock],
                        moduls: [
                            ...state.data.blocks[idBlock].moduls.splice(idModule, 1)
                            
                        ]
                    },
                    ...state.data.blocks.slice(idBlock + 1)
                ]
            }
        }
        
      case 'SET_SETTINGS':
      return {

      }

    default:
      return state;
  }
}
