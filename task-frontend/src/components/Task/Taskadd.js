import React, { Component } from "react";
import { connect } from "react-redux";

export class Taskadd extends Component {
  render() {
    return <div>taskadd</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Taskadd);
