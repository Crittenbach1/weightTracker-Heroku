import fetch from 'isomorphic-fetch';

export function removeChart(rec) {
  debugger
  return function(dispatch){
    return fetch(`/api/v1/charts/${rec}`, {
      credentials: "include",
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
