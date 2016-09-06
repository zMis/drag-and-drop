import React, { Component } from 'react';
import remove from './remove.svg';
import settings from './settings.svg';
import { Draggable, Droppable } from 'react-drag-and-drop'
import './App.css';
import JsonData from './data.js';

/*
var RemoveImageButton = React.createClass ({
  render: function() {
    return (
      <img className="box-image pull-right"  width="25px" src={remove} alt="remove"  onClick={this.props.clickHandler} />
    )
  }
});

*/

/*
unmount: function() {
  var node = this.getDOMNode();
  React.unmountComponentAtNode(node);
  $(node).remove();
},

handleClick: function() {
  this.unmount();
}
*/


class Modul extends Component {

  render() {
    return (
      <div className={`col-xs-12 col-md-12`}>
        <li className="panel panel-info"> 
          <div className="panel-heading">
            {this.props.name}
            <img className="box-image pull-right"  width="25px" src={remove} alt="remove" />
            <img className="box-image pull-right"  width="25px"  src={settings} alt="settings" />
          </div>
        </li>     
      </div>
    );
  }
}

class ModulType extends Component {

  render() {
    return (
      <div className={`col-xs-12 col-md-12`}>
        <li className="panel panel-info"> 
          <Draggable type="modultype" data={this.props}> 
            <div className="panel-heading">
              {this.props.type}
            </div>
          </Draggable>
        </li>
      </div>
    );
  }
}

class PageBlock extends Component {

  render() {
    return (
      <div className={`col-xs-${ this.props.size } col-md-${this.props.size}`}>
        <h2>{this.props.name}</h2>
        <Droppable types={['modultype']} onDrop={this.onDrop.bind(this)}>
          <div className="panel panel-info col-xs-12 col-md-12">
            <ul id="draggablePanelList" className="list-unstyled">
              {this.props.moduls.map((type, i) =>
                <Modul key={i} name={type.type} type={type.type} possibilities={type.possibilities} settings={type.settings} />
              )}
            </ul>
          </div>
        </Droppable>
      </div>
    );
  }

  onDrop(data) {
    console.log(data)
  }
}

class ModuleTypes extends Component {

  /*
componentDidMount(){

var URL='http://private-anon-4904ad187c-ccpiskvorky.apiary-mock.com/games';

    fetch(URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then((response) => response.json(), (error) => {
       // dispatch()
      })
      .then((payload) => {
      //   type: 'START_DONE',
          JsonData=payload;
     
      })
      .catch((e) => {
        
      })
}
*/
  renderTypes() {
    return this.props.data.types.map((type, i) =>
      <ModulType key={i}  type={type.type} possibilities={type.possibilities} settings={type.settings} />
    )
  }

  render() {
    return (
      <div className="col-xs-12 col-md-4">
        <h2>{this.props.name}</h2>
        {this.renderTypes()}
      </div>
    );
  }
}

class PageBlocks extends Component {

  renderBlocks() {
    return this.props.data.blocks.map((block, i) =>
      <PageBlock key={i} size={block.size}  name={block.name} moduls={block.moduls}  />
    ) 
  }

  render() {
    return (
      <div className="col-xs-12 col-md-8">
        <h2>{this.props.name}</h2>
        {this.renderBlocks()}
      </div>
    );
  }
}

class DragAndDropApp extends Component {

  render() {
    return (
      <div>
        <PageBlocks name="Editovaná stránka"  data={JsonData} /> 
        <ModuleTypes name="Dostupné Moduly"  data={JsonData} />
      </div>
    );
  }
}

export default DragAndDropApp;