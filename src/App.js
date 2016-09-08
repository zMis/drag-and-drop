import React, { Component } from 'react';
import remove from './remove.svg';
import settings from './settings.svg';
import { Draggable, Droppable } from 'react-drag-and-drop'
import './App.css';
import JsonData from './data.js';
import {connect} from 'react-redux';
import send from './actions';
var Modal = require('react-modal');

//this force update na refresh



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

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Modul extends Component {

  constructor(props) {
    super(props);




    this.handleDelete = () => {
     this.props.deleteModule(this.props.id,this.props.id_block);
    }


this.handleSettings = () => {
     this.props.setSetting(this.props.settings,this.props.id,this.props.id_block);
    }

  }

getInitialState: function() {
    return { modalIsOpen: false };
  },

  render() {
    return (
      <div className={`col-xs-12 col-md-12`}>
        <li className="panel panel-info"> 
          <div className="panel-heading">
            {this.props.name}
            <img className="box-image pull-right"  width="25px" onClick={this.handleDelete} src={remove} alt="remove" />
            <img className="box-image pull-right"  width="25px"  src={settings} alt="settings" />

          </div>
        </li>     
      </div>
    );
  }
}

class ModulType extends Component {

  render() {

    var json = JSON.stringify(this.props);

    return (
      <div className={`col-xs-12 col-md-12`}>
        <li className="panel panel-info"> 
          <Draggable type="object" data={json}>
            <div className="panel-heading draggableitem">
              {this.props.name}
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
        <Droppable types={['object']} onDrop={this.onDrop.bind(this)}>
          <div className="panel panel-info col-xs-12 col-md-12">
            <ul id="draggablePanelList" className="list-unstyled">
              {this.props.moduls.map((type, i) =>
                <Modul key={i} id={i} id_block={this.props.id} name={type.name} type={type.type} possibilities={type.possibilities} settings={type.settings} setSetting={this.setSetting} deleteModule={this.props.deleteModule} />
              )}
            </ul>
          </div>
        </Droppable>
      </div>
    );
  }



  onDrop(data){
    var data = JSON.parse(data.object);
    this.props.addModule(data,data.id,this.props.id,this.props.type);
  }
  
}

class ModuleTypes extends Component {

  renderTypes() {
    return this.props.data.types.map((type, i) =>
      <ModulType key={i} id={i} type={type.type} name={type.name} possibilities={type.possibilities} settings={type.settings} />
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
      <PageBlock key={i} id={i} size={block.size} type={block.type} setSetting={this.setSetting} name={block.name} moduls={block.moduls} addModule={this.props.addModule} deleteModule={this.props.deleteModule}  />
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

  constructor() {
    super();
    this.state = {data: JsonData};


    this.setSettings = (settings,id_module,id_block) => {

 this.state.data.blocks[id_block].moduls[id_module].settings=settings;

      /*
      // this.setState({data: data})
      console.log(id_module);
      console.log(id_block);
      this.state.data.blocks[id_block].moduls.splice (id_module, 1);
      //send(JsonData);
      */
      
      this.forceUpdate();
      
    };

    this.deleteModule = (id_module,id_block) => {
      // this.setState({data: data})
      console.log(id_module);
      console.log(id_block);
      this.state.data.blocks[id_block].moduls.splice (id_module, 1);
      //send(JsonData);
      this.forceUpdate();
      
    };
    this.addModule = (data,id_module,id_block,type) => {
      //this.setState({data: data})
      //  this.state.data.blocks[id_block].;
      var length=this.state.data.blocks[1].moduls.length+1;
      if(data.possibilities.includes(type)) {
      this.state.data.blocks[id_block].moduls.push(
          {
            name:data.name,
            type:data.type,
            possibilities:data.possibilities,
            settings:data.settings
          }
      );

          console.log("Vlozeno");
    }else  {
          console.log("Nelze vlozit do tohoto typu");
          }
      
      //send(JsonData);
      this.forceUpdate();
    };
  }

  render() {
    console.log(this.state.data.blocks[1]);
    return (
      <div>
        <PageBlocks name="Editovaná stránka"  data={this.state.data} setSetting={this.setSetting} addModule={this.addModule} deleteModule={this.deleteModule} />
        <ModuleTypes name="Dostupné Moduly"  data={this.state.data} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return state
}
/*
App.propTypes = {
  grid: PropTypes.array.isRequired,
  name: PropTypes.string,
  turn: PropTypes.string.isRequired,
  start: PropTypes.func.isRequired,
}
*/


export default connect(
  mapStateToProps
)(DragAndDropApp)
