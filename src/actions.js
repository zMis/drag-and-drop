function send(state) {
  return function(dispatch) {

    fetch('http://devel.atway.cz/json.php', {
        method: 'POST',
        headers: {
         /* 'Accept': 'application/json',
          'Content-Type': 'application/json'*/
        },
        body: JSON.stringify(state)
      })
      .then((response) => response.json(), (error) => {
        dispatch()
      })
      .then((payload) => {
        console.log(payload)
        dispatch({
          type: 'DONE',
          payload: payload
        })
      })
      .catch((err) => {
        console.log("fatch error: ", err)
      })
      
      
    }
 
}

function addModule(newModule, id_block, type) {
    return function(dispatch) {
        dispatch({
            type: 'ADD_MODULE',
            payload: {
                newModule,
                id_block,
                type
            }
        })
    }
}

function deleteModule(id_module, id_block) {
    return function(dispatch) {
        dispatch({
            type: 'DELETE_MODULE',
            payload: {
                id_module,
                id_block
            }
        })
    }
}
function setSettings(settings, id_module, id_block) {
    return function(dispatch) {
        dispatch({
            type: 'SET_SETTINGS',
            payload: {
              settings,
                id_module,
                id_block
            }
        })
    }
}

function openModal() {
    return function(dispatch) {
        dispatch({
            type: 'OPEN_MODAL',
            payload: {
                modalIsOpen
            }
        })
    }
}

function closeModal() {
    return function(dispatch) {
        dispatch({
            type: 'CLOSE_MODAL',
            payload: {
                modalIsOpen
            }
        })
    }
}

export default { addModule, send, deleteModule, setSettings }
