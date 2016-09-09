import {combineReducers} from 'redux';
import JsonData from './data.js';

const initialState = {
    data: JsonData
};


export default function reducer(state = initialState, action = {}) {
let idBlock;
  if (!state) return initialState;

  switch (action.type) {
      

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
                            ...state.data.blocks[idBlock].moduls.slice(0, idModule),
                            ...state.data.blocks[idBlock].moduls.slice(idModule+ 1)
                        ]
                    },
                    ...state.data.blocks.slice(idBlock + 1)
                ]
            }
        }
        /*
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
                            ...state.data.blocks[idBlock].moduls.slice(0, idModule),
                            ...state.data.blocks[idBlock].moduls.slice(idModule+ 1)
                        ]
                    },
                    ...state.data.blocks.slice(idBlock + 1)
                ]
            }
        }*/

      case 'SET_SETTINGS':
      return {

      }

      case 'OPEN_MODAL':
          return {
              modalIsOpen: true
          }
      
      case 'CLOSE_MODAL':
          return {
              modalIsOpen: false
          }
      
    default:
      return state;
  }
}
