import fetch from 'isomorphic-fetch';

export function fetchCharts() {
    debugger
  return function(dispatch){
    dispatch({type: 'LOADING'})
    var url = 'https://localhost:3001/api/v1/charts.json';
    var req = new Request(url);
    return fetch(req)
    .then(function(response) {
      return response.json()
    })
     .then(function(people) {
        dispatch({type: 'FETCH_CHARTS', payload: people})
    })
  }
}
