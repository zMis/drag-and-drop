import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
/*
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}
*/
// Define React Component
class Modul extends Component {
  render() {
    return (
      <div className={`col-xs-12 col-md-12`}>
        <li className="panel panel-info"> 
          <div className="panel-heading">{this.props.name}
          </div>
        </li>     
      </div>
    );
  }
}

class PanelWebPart extends Component {
  render() {
    return (
      <div className={`col-xs-${ this.props.size } col-md-${ this.props.size }`}>
        <h2>{this.props.name}</h2>
        <div className="panel panel-info col-xs-12 col-md-12">
          <ul id="draggablePanelList" className="list-unstyled">
            <Modul name="Novinky" />
            <Modul name="Volný text" />
            <Modul name="Slideshow" />
          </ul>
        </div>        
      </div>
    );
  }
}
         
class PanelModuly extends Component {
  render() {
    return (
      <div className="col-xs-12 col-md-4">
        <h2>{this.props.name}</h2>
        <div className="panel panel-info col-xs-12 col-md-12">
          <Modul name="Novinky" />
          <Modul name="Volný text" />
          <Modul name="Slideshow" />
          <Modul name="Rychlá rezervace" />
          <Modul name="Anketa" />
        </div>
      </div>
    );
  }
}
      
        

class PanelStranka extends Component {
  render() {
    return (
      <div className="col-xs-12 col-md-8">
        <h2>{this.props.name}</h2>
        <PanelWebPart size="12" name="Hlavicka" />
        <PanelWebPart size="6" name="Levy Sloupec" />
        <PanelWebPart size="6" name="Pravy Sloupec" />
        <PanelWebPart size="12" name="Paticka" />
      </div>
    );
  }
}


class DragAndDropApp extends Component {
  render() {
    return (    
      <div>
        <PanelStranka name="Editovaná stránka"  /> 
        <PanelModuly name="Dostupné Moduly"  />
      </div>
    );
  }
}

export default DragAndDropApp;