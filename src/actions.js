export function send(data) {
  return function(dispatch) {

    dispatch({
        type: 'DROP',
        data
      })

    fetch('http://devel.atway.cz/json.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: data
        })
      })
      .then((response) => response.json(), (error) => {
        dispatch()
      })
      .then((payload) => {
        dispatch({
          type: 'DONE',
          payload: payload
        })
      })
      .catch((e) => {
        
      })
      
      
    }
 
}

export function addModule(newModule, id_block) {
    return function(dispatch) {
        dispatch({
            type: 'ADD_MODULE',
            payload: {
                newModule,
                id_block
            }
        })
    }
}