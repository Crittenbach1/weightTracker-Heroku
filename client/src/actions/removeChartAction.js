import fetch from 'isomorphic-fetch';

export function removeChart(rec) {
  debugger
  return function(dispatch){
    var url = `https://localhost:3001/api/v1/charts/${rec}`;
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': "application/json",
        'Content-Type': "application/json",
      },
      body: JSON.stringify(rec)
    })
    .then(res => {
      return res
    }).then(data => {
         debugger
         dispatch({type: 'REMOVE_CHART', payload: rec})
    })
  }
}
