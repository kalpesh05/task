import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Segment,
  Modal,
  Button,
  Form,
  Image,
  Icon,
  Dropdown,
  Label,
  Checkbox
} from "semantic-ui-react";
import { createTask } from "../../../action/task";
import ServerError from "../../Notification/ServerErrors";

export class Taskadd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      desciption: ""
    };

    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ tasklist: nextProps.tasklist });
  }

  async handleSaveClick() {
    this.setState({ loading: true, form_error: false });
    let { createTask } = this.props;
    let { title, desciption } = this.state;

    let params = { title, desciption };
    await createTask(params)
      .then(data => {
        this.props.close();
      })
      .catch(e => {
        this.setState({ form_error: e.response.data, loading: false });
      });
  }

  handleInputChange(e, { id }) {
    this.setState({ [id]: e.target.value });
  }

  render() {
    let { title, desciption, loading, form_error } = this.state;
    return (
      <div>
        <Modal
          open={true}
          closeOnEscape={true}
          closeOnDimmerClick={true}
          onClose={this.props.close}
          size="tiny"
          id="taskForm"
        >
          <Modal.Header>Task Details</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Input
                fluid
                icon="pencil"
                id="title"
                value={title}
                label="Title"
                onChange={this.handleInputChange}
                placeholder="Title"
              />

              <Form.Input
                fluid
                icon="pencil"
                id="desciption"
                label="Desciption"
                onChange={this.handleInputChange}
                value={desciption}
                placeholder="Desciption"
              />
              {form_error && <ServerError errorMessage={form_error} />}
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.props.close} negative>
              Cancel
            </Button>
            <Button
              positive
              labelPosition="right"
              icon="checkmark"
              loading={loading}
              content="Create"
              onClick={this.handleSaveClick}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ task }) => ({
  tasklist: task.list
});

const mapDispatchToProps = { createTask };

export default connect(mapStateToProps, mapDispatchToProps)(Taskadd);
