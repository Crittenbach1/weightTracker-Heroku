export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_CHARTS':
      debugger
      let charts = [];
      for (let i=0; action.payload.length > i; i++){
         let chart = { date: action.payload[i].date, id: action.payload[i].id, people: [] };

         for (let j=0; action.payload[i].people.length > j; j++){
           let dataPoints = [];

            for (let w=0; action.payload[i].weights.length > w; w++){
                if (action.payload[i].weights[w].person_id == action.payload[i].people[j].id) {
                  let weight = { x: parseInt(action.payload[i].weights[w].currentDate),
                                 y: parseInt(action.payload[i].weights[w].pounds) }
                  dataPoints.push(weight);
                }
            }

            function compare(a,b) {
               if (a.x < b.x) return -1;
               if (a.x > b.x) return 1;
               return 0;
             }

             dataPoints.sort(compare);

             let person = { name: action.payload[i].people[j].name,
                            showInLegend: true,
                            type: "line",
                            xValueType: "dateTime",
                            toolTipContent: "{x}: {y}lb",
                            dataPoints: dataPoints }
            chart.people.push(person);
         }
         charts.push(chart);
      }
      return charts;
    case 'ADD_CHART':
       let chart = { date: action.payload.date, id: action.payload.id, people: [] };

        for (let j=0; action.payload.people.length > j; j++){
            let dataPoints = [];

              for (let w=0; action.payload.weights.length > w; w++){
                  if (action.payload.weights[w].person_id == action.payload.people[j].id) {
                    let weight = { x: parseInt(action.payload.weights[w].currentDate),
                                   y: parseInt(action.payload.weights[w].pounds) }
                    dataPoints.push(weight);
                  }
              }

              function compare(a,b) {
                 if (a.x < b.x) return -1;
                 if (a.x > b.x) return 1;
                 return 0;
               }

               dataPoints.sort(compare);

               let person = { name: action.payload.people[j].name,
                              showInLegend: true,
                              type: "line",
                              xValueType: "dateTime",
                              toolTipContent: "{x}: {y}lb",
                              dataPoints: dataPoints }
              chart.people.push(person);
          }

       return [...state, chart];
       case 'REMOVE_CHART':
          debugger
          let charts2 = [];
          for(let i=0; state.length > i; i++) {
             if (state[i].id != action.payload) {
               charts2.push(state[i]) ;
             }
           }
           debugger
          return charts2;
    default:
      return state;
  }
}
