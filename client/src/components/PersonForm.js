import React, { Component } from 'react';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import blue from '@material-ui/core/colors/blue';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff4400',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // error: will use the default color
  },
});

class PersonForm extends Component {


  componentWillReceiveProps(nextProps) {
    debugger
    if (nextProps.saveData == true) {
      nextProps.chartPeople({ name: this.state.name, weights: this.state.weights });
    }
    if (nextProps.weights.length > this.state.weights.length) {
      let newWeight = nextProps.weights[nextProps.weights.length - 1];
      this.setState({ weights: this.state.weights.concat([newWeight]) });
    }

    if (nextProps.weights.length < this.state.weights.length) {
      let newWeights = this.state.weights;
      newWeights.pop();
      this.setState({ weights: newWeights });
    }


   }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      weights: this.props.weights,
      currentDate: this.props.currentDate
    }
  }

    handleNameChange = (input) => {
      this.setState({ name: input });
    }

    handleWeightPoundsChange = (idx) => (evt) => {
      const newWeights = this.state.weights.map((weight, widx) => {
        if (idx !== widx) return weight;
        return { ...weight, pounds: evt.target.value };
      });

      this.setState({ weights: newWeights });
    }


  render() {
    debugger
    const { classes } = this.props;

    return (
      <div>
      <form className={classes.container} noValidate autoComplete="off">

       <TextField
       onChange={ (e)=>this.handleNameChange(e.target.value) }
          id="standard-name"
          label="Name"
          placeholder={`Person #${this.props.id} name`}
          className={classes.textField}
          value={this.state.name}
          margin="normal"
        />

        </form>

         <form onSubmit={this.handleSubmit} className={classes.container} noValidate autoComplete="off">
            {this.state.weights.map((weight, idx) => (
              <div className="weight">
                <TextField
                onChange={ this.handleWeightPoundsChange(idx) }
                   id="standard-name"
                   placeholder={`Weight #${idx + 1} on ${weight.currentDate}`}
                   className={classes.textField}
                   value={weight.pounds}
                   margin="normal"
                 />


              </div>
            ))}
        </form>
       </div>
    );
  }
}


export default withStyles(styles)(PersonForm);
