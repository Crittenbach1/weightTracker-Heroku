import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCharts } from './actions/fetchChartsAction.js'
import NewChartData from './containers/NewChartData.js';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import blue from '@material-ui/core/colors/blue';

import 'typeface-roboto';

import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

class App extends Component {

  componentDidMount() {
    this.props.fetchCharts();
  }


  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
            <NewChartData className="newChartData" />
        </div>
      </MuiThemeProvider>

    );
  }
}

export default connect(null, {fetchCharts})(App);
