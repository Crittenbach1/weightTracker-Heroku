import fetch from 'isomorphic-fetch';

export function fetchCharts() {
    debugger
  return function(dispatch){
    dispatch({type: 'LOADING'})
    return fetch('/api/v1/charts.json', {
      credentials: "include",
      method: 'GET',
      headers: {
        'Accept': "application/json",
        'Content-Type': "application/json",
      },
    })
    .then(function(response) {
      return response.json()
    })
     .then(function(people) {
        dispatch({type: 'FETCH_CHARTS', payload: people})
    })
  }
}
