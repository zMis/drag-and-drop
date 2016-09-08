import React from 'react';
import ReactDOM from 'react-dom';
import DragAndDropApp from './App';
import './index.css';
import { Draggable, Droppable } from 'react-drag-and-drop'
import store from './store';
import {Provider,ReactRedux} from 'react-redux';


ReactDOM.render(
  <Provider store={store}>
    <DragAndDropApp />
  </Provider>,
  document.getElementById('root')
);

