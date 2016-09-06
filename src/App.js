import React, { Component } from 'react';
import logo from './logo.svg';
import remove from './remove.svg';
import settings from './settings.svg';
import { Draggable, Droppable } from 'react-drag-and-drop'
import './App.css';

// Define React Component

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

  constructor(props) {
    super(props);

  }


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



// Define React Component
class ModulType extends Component {
     
    constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className={`col-xs-12 col-md-12`}>
        <li className="panel panel-info"> 
         <Draggable type="modultype" data={this.props}> <div className="panel-heading">{this.props.type}
          </div></Draggable>
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
        <Droppable
                types={['modultype']} // <= allowed drop types 
                onDrop={this.onDrop.bind(this)}>  
          <div className="panel panel-info col-xs-12 col-md-12">
          <ul id="draggablePanelList" className="list-unstyled">
          
              {this.props.moduls.map((type, i) =>
          <Modul key={i} name={type.type} type={type.type} possibilities={type.possibilities} settings={type.settings} />
        )}

          </ul>
  

        </div>          </Droppable>    
      </div>
    );
  }
  
  onDrop(data) {
        console.log(data)
        // => banana  
    }
}
         
class ModuleTypes extends Component {

        constructor(props) {
    super(props);
    this.indents = [];
this.indents = this.props.data.types.map((type, i) =>
          <ModulType key={i}  type={type.type} possibilities={type.possibilities} settings={type.settings} />
        )
  }
  
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

  render() {
    return (
      <div className="col-xs-12 col-md-4">
        <h2>{this.props.name}</h2>
        {this.indents}
      </div>
    );
  }
}
      
        

class PageBlocks extends Component {
    constructor(props) {
    super(props);
    this.indents = [];
this.indents = this.props.data.blocks.map((block, i) =>
          <PageBlock key={i} size={block.size}  name={block.name} moduls={block.moduls}  />
        )  
  }

  render() {
    
    return (
      <div className="col-xs-12 col-md-8">
        <h2>{this.props.name}</h2>
{this.indents}
      </div>
    );
  }
}


class DragAndDropApp extends Component {
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
  ],
"blocks":[
    {
  "name":"header",
  "size":12,
  "moduls":[
    {"type":"logo je cool",
    "possibilities":["header","left","right"],
    "settings":[{"title":"jjj","content":"tohle je header joo ","author":"All"}]
     }
  ]},
  {"name":"left",
  "size":6,
  "moduls":[
    {"type":"anket",
    "possibilities":["footer","left","right"],
    "settings":[{"title":"ahoj","content":"tohle jj alright","author":"Ondra"}]
  }
  ]},
  {"name":"right",
  "size":6,
  "moduls":[
    {"type":"news",
    "possibilities":["header","left","right"],
    "settings":[{"title":"Novinky","content":"To jsou super novinky","author":"Filip"}]
  },
    {"type":"text",
    "possibilities":["header","left","right"],
    "settings":[{"title":"loool","content":"tohle je left Xd","author":"Filip"}]
     },
    {"type":"anket",
    "possibilities":["footer","left","right"],
    "settings":[{"title":"jjj","content":"tohle je seeej","author":"Filip"}]
  }
  ]},
  {"name":"footer",
  "size":12,
  "moduls":[
    {"type":"Right",
    "possibilities":["left","right"],
    "settings":[{"title":"ahoj","content":"tohle je right","author":"Ondra"}]
  },
    {"type":"anket",
    "possibilities":["footer","left","right"],
    "settings":[{"title":"ahoj","content":"tohle je right","author":"Ondra"}]
  }
  ]
    }]
     }
  ;
   
        
    return (    
      <div>
        <PageBlocks name="Editovaná stránka"  data={JsonData} /> 
        <ModuleTypes name="Dostupné Moduly"  data={JsonData} />
      </div>
    );
  }
}

export default DragAndDropApp;