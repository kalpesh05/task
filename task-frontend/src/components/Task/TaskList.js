import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Icon,
  Grid,
  List,
  Label,
  Dropdown,
  Input,
  Table,
  Segment,
  Checkbox,
  Button,
  Header,
  Image,
  Menu
} from "semantic-ui-react";
import { listTask } from "../../action/task";
import Taskadd from "./Add/Taskadd";
class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props.list,
      loading: props.list === null,
      openTaskForm: false
    };
  }

  componentDidMount() {
    alert("5");
    let { listTask } = this.props;
    listTask({})
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      list: nextProps.list,
      loading: nextProps.list == null ? true : false
    });
  }

  render() {
    const { loading, list, openTaskForm } = this.state;
    return (
      <Segment id="task">
        <div className="task-action">
          <Button
            floated="right"
            icon
            labelPosition="left"
            primary
            onClick={() => this.setState({ openTaskForm: true })}
          >
            <Icon name="plus"></Icon>Add Task
          </Button>
        </div>

        <Table color="red" selectable celled striped>
          {
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          }
          <Table.Body>
            {list != null &&
              list.map((o, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{o.title}</Table.Cell>
                  <Table.Cell>{o.desciption}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>

        {openTaskForm && (
          <Taskadd close={() => this.setState({ openTaskForm: false })} />
        )}
      </Segment>
    );
  }
}

const mapStateToProps = ({ user, task }) => ({ user, list: task.list });

const mapDispatchToProps = { listTask };

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
