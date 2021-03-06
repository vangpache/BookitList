import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Paper, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';



const styles = theme => ({
  textFields: {
    margin: '10px',
    backgroundColor: 'white',
  }
})

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  handlePrefill = () => {
    this.setState ({
      username: 'pache',
      password: 'december',
    })
  }

  render() {
    return (
      <div className="loginPageDiv">
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <>
        {/* <center> */}
        <form onSubmit={this.login}>
          <h1 onClick={this.handlePrefill} >Login</h1>
          <div>
            <label htmlFor="username">
              {/* Username: */}
              <TextField
                className={this.props.classes.textFields}
                variant="outlined"
                label="username"
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              {/* Password: */}
              <TextField
                className={this.props.classes.textFields}
                variant="outlined"
                label="password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <input
              className="log-in"
              type="submit"
              name="submit"
              value="Log In"
            />
          </div>
          
        </form>
        {/* </center> */}
        </>
        <center>
          <Button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
          >
            Register
          </Button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default withStyles(styles) (connect(mapStateToProps)(LoginPage));
