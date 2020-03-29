import React, { Component } from "react";
import Routes from "../../routes";
import { setAuthHeader } from "../../utils/common";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";

const stateToProps = state => {
  return {
    user: state
  };
};

class App extends Component {
  componentWillMount() {
    setAuthHeader();
  }

  render() {
    return <Routes />;
  }
}

export default connect(stateToProps)(App);
