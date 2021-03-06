import React, { Component } from 'react';
import remove from './remove.svg';
import settings from './settings.svg';
import { Draggable, Droppable } from 'react-drag-and-drop'
import './App.css';
import JsonData from './data.js';
import { connect } from 'react-redux';
import actions from './actions';
var Modal = require('react-modal');
import store from './store';

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
 //   this.forceUpdate();

constructor(props){
   super(props);
    this.modalIsOpen=false;
}

  handleDelete() {
    this.props.deleteModule(this.props.id,this.props.id_block)
  }
  handleSettings() {
    //this.props.setSettings(this.props.settings, this.props.id, this.props.id_block)
  }
    getInitialState() {
        return { modalIsOpen: false };
    }
    openModal() {

        this.modalIsOpen=true;
     console.log(this.props.settings);
        this.forceUpdate();
    }

    afterOpenModal() {
        this.refs.subtitle.style.color = '#f00';
    }
    closeModal() {
    this.modalIsOpen=false;

    //  jak z toho imputu ziskat data hmm?  this.refs.subtitle.style.color = '#f00';


    this.props.setSettings(this.props.settings[0],this.props.id,this.props.id_block);
    this.forceUpdate();
}
    render() {

    var inputs = [];

    for (var key in this.props.settings[0]){
        inputs.push(
            <div>
            <label>{key}</label>
            <input
        className="name-input"
        ref={key}
        type="text"
        defaultValue ={this.props.settings[0][key]}
          />
         </div>
        );
    }
    return (
      <div className={`col-xs-12 col-md-12`}>
        <li className="panel panel-info"> 
          <div className="panel-heading">
            {this.props.name}
            <img className="box-image pull-right"  width="25px" onClick={this.handleDelete.bind(this)} src={remove} alt="remove" />
            <img className="box-image pull-right"  width="25px" onClick={this.openModal.bind(this)} src={settings} alt="settings" />

              <Modal
                  isOpen={this.modalIsOpen}
                //  onAfterOpen={this.afterOpenModal}
                //  onRequestClose={this.closeModal}
                  style={customStyles} >

                  <h2 ref={this.props.name}> {this.props.name}</h2>
                 <form>
                      {inputs}
                  </form>
                  <div className="col-md-4 text-center">
                      <button onClick={this.closeModal.bind(this)} id="singlebutton" name="singlebutton" className="btn btn-primary">
                          Uložit
                      </button>
                  </div>
              </Modal>
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
            <div className="panel-heading draggableitem" draggable="true">
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
          <div className="PageBlock panel col-xs-12 col-md-12">
            <ul id="draggablePanelList" className="list-unstyled">
              {this.props.moduls.map((type, i) =>
                <Modul key={i} id={i} id_block={this.props.id} name={type.name} type={type.type} possibilities={type.possibilities} settings={type.settings} setSettings={this.props.setSettings}  deleteModule={this.props.deleteModule} />
              )}
            </ul>
          </div>
        </Droppable>
      </div>
    );
  }

  onDrop(data){

      var data = JSON.parse(data.object);
      var settings={};
      data.settings.forEach(function(elem) {
          settings[elem]="";
      });
      data.settings[0]= settings;

    console.log(data)
    console.log('type:', this.props.type)
    this.props.addModule(data, this.props.id, this.props.type)
    let state = store.getState()
    //this.props.send(state.data)
    
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
      <PageBlock key={i} id={i} size={block.size} type={block.type} name={block.name} moduls={block.moduls} setSettings={this.props.setSettings}  addModule={this.props.addModule} deleteModule={this.props.deleteModule}  send={this.props.send}/>
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
        <PageBlocks name="Editovaná stránka" data={this.props.data} setSettings={this.props.setSettings} addModule={this.props.addModule} deleteModule={this.props.deleteModule} send={this.props.send}/>
        <ModuleTypes name="Dostupné Moduly" data={this.props.data} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.data
  }
}

export default connect(
  mapStateToProps,
  actions
)(DragAndDropApp)
