import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Define React Component
class Modul extends Component {

construktor(PageBlockId,Id,PosId,Settings,Type){


}


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



// Define React Component
class ModulType extends Component {
/*
constructor(Settings,Type,Possibilities){


}
*/
  render() {
    return (
      <div className={`col-xs-12 col-md-12`}>
        <li className="panel panel-info"> 
          <div className="panel-heading">{this.props.type}
          </div>
        </li>     
      </div>
    );
  }
}

class PageBlock extends Component {
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
         
class ModuleTypes extends Component {
/*
constructor(){

ArrTypes= [];

const JsonData={
"types":[
    {"type":"news",
    "possibilities":["header","left","right"],
    "settings":["title","content"]
  },
    {"type":"text",
    "possibilities":["header","left","right"],
    "settings":["title","author","content"]
     },
    {"type":"anket",
    "possibilities":["footer","left","right"],
    "settings":["title"]
  }
  ]
};

}
*/

componentDidMount(){

/*
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

      */
      
}


  render() {
var JsonData={
"types":[
    {"type":"news",
    "possibilities":["header","left","right"],
    "settings":["title","content"]
  },
    {"type":"text",
    "possibilities":["header","left","right"],
    "settings":["title","author","content"]
     },
    {"type":"anket",
    "possibilities":["footer","left","right"],
    "settings":["title"]
  }
  ]
};


    return (
      <div className="col-xs-12 col-md-4">
        <h2>{this.props.name}</h2>
        <div className="panel panel-info col-xs-12 col-md-12">
        {JsonData.types.map((type, i) =>
          <ModulType key={i} type={type.type} possibilities={type.possibilities} settings={type.settings} />
        )}

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
        <PageBlock size="12" name="Hlavicka" />
        <PageBlock size="6" name="Levy Sloupec" />
        <PageBlock size="6" name="Pravy Sloupec" />
        <PageBlock size="12" name="Paticka" />
      </div>
    );
  }
}


class DragAndDropApp extends Component {
  render() {
    return (    
      <div>
        <PanelStranka name="Editovaná stránka"  /> 
        <ModuleTypes name="Dostupné Moduly"  />
      </div>
    );
  }
}

export default DragAndDropApp;