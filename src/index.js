import React from 'react';
import ReactDOM from 'react-dom';
import DragAndDropApp from './App';
import './index.css';
import { Draggable, Droppable } from 'react-drag-and-drop'

ReactDOM.render(
  <DragAndDropApp />,
  document.getElementById('root')
);

