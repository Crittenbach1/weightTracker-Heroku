import fetch from 'isomorphic-fetch';

export function saveData(rec) {
  debugger
  return function(dispatch){
    var url = 'https://localhost:3001/api/v1/charts';
    return fetch(url, {
      method: "POST",
      headers: {
        'Accept': "application/json",
        'Content-Type': "application/json",
      },
      body: JSON.stringify(rec)
    })
    .then(res => {
      return res.json()
    }).then(data => {
         debugger
         dispatch({type: 'ADD_CHART', payload: data})
    })
  }
}
