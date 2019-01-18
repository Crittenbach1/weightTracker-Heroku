import React, { Component } from 'react';
import {connect} from "react-redux";
import { removeChart } from '../actions/removeChartAction.js';
import { saveData } from '../actions/saveDataAction.js';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import Select from 'react-select';

var CanvasJSReact = require('../canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;



class Chart extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.people.length > 0) {
      let orderedPeople = this.orderPeople(nextProps.people);
      this.setState({ data: orderedPeople,
                      selectedOption: null
                    });
    }

    if (nextProps.charts != this.state.savedCharts) {
      this.setState({ savedCharts: nextProps.charts });
    }

  }

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: '',
      savedCharts: [],
      selectedOption: null,
    }
    this.sendData = this.sendData.bind(this);
    this.removeChart = this.removeChart.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
}

  handleSelectChange = (selectedOption) => {
    let chart;
    for (let i = 0; this.state.savedCharts.length > i; i++) {
         if(this.state.savedCharts[i].id == selectedOption.id) {
           let people = this.state.savedCharts[i].people;
            chart = this.orderPeople(people);
         }
    }
    this.setState({
                    selectedOption: selectedOption,
                    data: chart
                  });
  }

  getSelectOptions() {
    debugger
    let options = [];
    for(var i=0; i < this.state.savedCharts.length; i++) {
        if (this.state.savedCharts[i].id != null) {
          let option = { id: this.state.savedCharts[i].id, label: this.state.savedCharts[i].date }
          options.push(option);
        }
    }
    return options;
  }

  orderPeople(people) {
      function compare(a,b) {
         if (a.x < b.x) return -1;
         if (a.x > b.x) return 1;
         return 0;
       }

       for (let i = 0; i < people.length; i++) {
             let weights = [];
             for (let j = 0; j < people[i].dataPoints.length; j++) {
                  weights.push(people[i].dataPoints[j]);
             }
             people[i].dataPoints = weights.sort(compare);
        }
         return people;
    }

    sendData(){
      let data = this.state.data;
      let people = [];

      for (let i=0; data.length > i; i++) {
        let person = { name: data[i].name, weights_attributes: [] };
         let person_weights = [];
        for (let j=0; data[i].dataPoints.length > j; j++) {
             let weight = { pounds: data[i].dataPoints[j].y.toString(),
                            currentDate: data[i].dataPoints[j].x.toString() }
             person_weights.push(weight)
        }
        person.weights_attributes = person_weights;
        people.push(person);
      }

      let newDate = new Date().toString();
      debugger
      this.props.saveData({ date: newDate.toString(), people_attributes: people });
    }

    removeChart() {
      debugger
      this.setState({ selectedOption: null,
                      data: []
                    } )
      this.props.removeChart(this.state.selectedOption.id);
    }



  render() {
    debugger
    const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2",
			axisY: {
				title: "Weight",
				includeZero: false,
				suffix: "lb"
			},
			axisX: {
				title: "Date",
				prefix: "",
				interval: 2
			},
      legend: {
          cursor: "pointer",
          itemclick: function (e) {
              if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                  e.dataSeries.visible = false;
              } else {
                  e.dataSeries.visible = true;
              }

              e.chart.render();
          }
      },
	    	data: this.state.data
      }

      let chartOptions = this.getSelectOptions();

      const { selectedOption } = this.state;

      let chart = null;
      if (this.state.data[0]) {
         chart = <CanvasJSChart options={options} />
      }

      let deleteButton = null;
      if (this.state.selectedOption != null) {
         deleteButton = <Button id="saveDeleteButton" variant="contained" color="primary" onClick={this.removeChart}>Remove Chart</Button>
      }

      let saveButton = null;
      let newDate = new Date();
      if (this.state.selectedOption == null && this.state.data[0]) {
         saveButton = <Button id="saveDeleteButton" variant="contained" color="primary" onClick={this.sendData}>Save Chart</Button>
      }


    return (
      <div className="chart" style={{height: "auto", width: 840 + "px"}}>
        {this.state.error}

        {chart}
        {deleteButton}
        {saveButton}

        <Select
          value={selectedOption}
          onChange={this.handleSelectChange}
          options={chartOptions}
        />

      </div>
    );
  }
}

function mapStateToProps(state) {
  debugger

   return {
     charts: state.fetchCharts,
   }
}

export default connect(mapStateToProps, {saveData, removeChart})(Chart);
