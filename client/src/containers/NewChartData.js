import React, { Component } from 'react';
import {connect} from "react-redux";
import Chart from '../components/Chart.jsx';
import Error from '../components/Error.js';
import PersonForm from '../components/PersonForm.js';
import Button from '@material-ui/core/Button';

import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker } from 'material-ui-pickers';

class NewChartData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: new Date(),
      weights: [],
      people: [{id: 1}],
      chartData: [],
      savePeopleData: [],
      saveData: false,
      error: false
    }
    this.addPerson = this.addPerson.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleAddWeight = this.handleAddWeight.bind(this);
    this.errorCheck = this.errorCheck.bind(this);
  }


  handleDateChange(input) {
    this.setState({
      startDate: input
    });
  }

  handleAddWeight = () => {
    let weights = this.state.weights;
    let bothDates = this.getDateData(this.state.startDate)
    if (this.errorCheck('ADD_WEIGHT', bothDates) == false) {
      debugger
      weights.push({ id: this.state.weights.length + 1,
                     currentDate: bothDates[1],
                     pounds: '',
                     ms: bothDates[0]
                   })
      this.setState({ weights: weights,
                      error: false
                    })
    }
  }

  handleRemoveWeight = () => {
    debugger
    let weights = this.state.weights;
    weights.pop();
    this.setState({ weights: weights });
  }

  getDateData = (selectedDate) => {
    var date = new Date(selectedDate);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    var ms = date.setMilliseconds(0);

    function formatDate(date) {
      var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];

      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();

      return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }

    let currentDate = formatDate(date);
    return [ms, currentDate];
  }

  addPerson = () => {
    this.setState({ people: this.state.people.concat([{ id: this.state.people.length + 1 }]) });
  }

  removePerson = () => {
    let people = this.state.people;
    people.pop();
    this.setState({ people: people });
  }

  errorCheck = (type, data) => {
    switch (type) {
      case 'CHART_PEOPLE':
      debugger
          let poundsError = data.weights.filter(function(w){ return w.pounds == "" })[0] != null;
          let weightsError = data.weights[0] == null;
          let nameError = data.name == "";
          if (poundsError || nameError || weightsError) {
            this.setState({ saveData: false,
                            chartData: [],
                            error: "name or weights must not be empty"
                          });
            return true;
          } else { return false };
      case 'ADD_WEIGHT':
       debugger
          let taken = this.state.weights.filter(function(w){ return w.currentDate === data[1] });
          let peopleEmpty = this.state.people[0];
          if (taken.length != 0) {
            this.setState({ error: "selected date is taken"})
          } else if (peopleEmpty == null) {
            this.setState({ error: "must create a person first to add weights"})
          } else { return false };
      default:
        return true;
      }
   }

  chartPeople = (data) => {
    debugger
        if (this.errorCheck("CHART_PEOPLE", data) == false) {

            let savePeopleData = this.state.savePeopleData;
            savePeopleData.push(data);
            this.setState({ savePeopleData: savePeopleData });
            //////////////////////////////////////
            let chartData = this.state.chartData;
            let dataPoints = [];
            for(let i=0; data.weights.length > i; i++) {
              let w = { x: data.weights[i].ms,
                        y: parseInt(data.weights[i].pounds) };
              dataPoints.push(w);
            }
            let person = { name: data.name,
                           showInLegend: true,
                           type: "line",
                           xValueType: "dateTime",
                           toolTipContent: "{x}: {y}lb",
                           dataPoints: dataPoints }
            chartData.push(person);
            this.setState({ chartData: chartData });
            if (this.state.chartData.length == this.state.people.length) {
              this.setState({ saveData: false,
                              chartData: [],
                              savePeopleData: [],
                              error: false
                             });
            }
       }
  }

  saveData = () => {
   this.setState({ saveData: !this.state.saveData,
                   chartData: [],
                   savePeopleData: []
                 });
 }

  render() {

    let error = null;
    if (this.state.error != false) {
      let error = <Error message={this.state.error} />
    }

    return (
      <div id="newWeight">

         <div id="people_form">

          { this.state.error ? <Error message={this.state.error} /> : null }
          <Button id="button" variant="contained" color="primary" onClick={this.removePerson}>Remove Person</Button>
          <Button id="button" variant="contained" color="primary" onClick={this.addPerson}>Add Person</Button>
          <Button id="button" variant="contained" color="primary" onClick={this.saveData} >Chart Data</Button>
          <Button id="button" variant="contained" color="primary" onClick={this.handleAddWeight}>Add Weight</Button>
          <Button id="button" variant="contained" color="primary" onClick={this.handleRemoveWeight}>Remove Weight</Button>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
             <div className="picker">
               <DatePicker
                 label="Select a Date"
                 value={this.state.startDate}
                 onChange={this.handleDateChange}
                 animateYearScrolling
               />
             </div>
           </MuiPickersUtilsProvider>

          {this.state.people.map(person=><PersonForm
                                          key={person.id}
                                          id={person.id}
                                          weights={this.state.weights}
                                          currentDate={this.state.startDate.toString()}
                                          chartPeople={this.chartPeople.bind(this)}
                                          saveData={this.state.saveData}
                                          />)}

        </div>
        <Chart people={this.state.chartData} savePeopleData={this.state.savePeopleData} />

      </div>
    )
  }
}

function mapStateToProps(state) {
   return {
     charts: state.fetchCharts
   }
}

export default connect(mapStateToProps)(NewChartData);
