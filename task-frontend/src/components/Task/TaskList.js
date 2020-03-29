import React, { Component } from "react";
import { connect } from "react-redux";

export class TaskList extends Component {
  render() {
    return <div>taskList</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
