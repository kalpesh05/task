import "./login.scss";
import "./login.scss";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Form,
  Segment,
  Button,
  Message,
  Icon,
  Divider
} from "semantic-ui-react";
import ServerError from "../Notification/ServerErrors";
import { login } from "../../action/user";
export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      msg: "",
      loading: false,
      form_error: false
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nex)
    if (nextProps.user) {
      this.props.history.push("/taskList");
    }
  }

  handleChange(e) {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleLogin() {
    let { login } = this.props;
    this.setState({ loading: true, form_error: false });

    let { email, password } = this.state;

    if (email === "") {
      this.setState({ msg: "Email is Required!!!" });
      return false;
    } else if (password === "") {
      this.setState({ msg: "password is Required!!!" });
      return false;
    } else {
      let obj = { email, password };
      console.log(obj);
      login({ email, password })
        .then(data => {
          console.log(data);
          let { user } = data;
          this.setState({ loading: false, user: user });
        })
        .catch(e => {
          let {
            response: { data }
          } = e;
          console.log(e.response);
          this.setState({ loading: false, form_error: data });
        });
    }
  }

  render() {
    const { email, password, loading, form_error } = this.state;

    console.log(email);
    return (
      <Segment className={"login-root"}>
        <Grid centered>
          <Grid.Row>
            <Grid.Column>
              <Form onSubmit={this.handleLogin}>
                <Form.Input
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="Email"
                  name="email"
                  value={email}
                  fieldtype="email"
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={password}
                  fieldtype="password"
                  onChange={this.handleChange}
                />
                {form_error && <ServerError errorMessage={form_error} />}
                <Button
                  className={"mb-1"}
                  color="blue"
                  content="Sign in"
                  icon="sign-in"
                  loading={loading}
                  disabled={loading}
                  fluid
                />
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user
});

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
