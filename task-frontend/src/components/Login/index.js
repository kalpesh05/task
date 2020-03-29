import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../action/user";
export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      msg: ""
    };

    // this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleLogin() {
    let { login } = this.props;

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
          this.setState({ msg: data });
        })
        .catch(e => {
          console.log(e);
          this.setState({ msg: e });
        });
    }
  }

  render() {
    let { email, password } = this.state;
    console.log(email);
    return (
      <div>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={e => this.handleChange(e)}
        />
        <br />
        <br />
        <br />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={e => this.handleChange(e)}
          // onChange={this.handleChange}
        />
        <br />
        <br />
        <br />
        <button
          onClick={() => {
            this.handleLogin();
          }}
        >
          Login
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user
});

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
