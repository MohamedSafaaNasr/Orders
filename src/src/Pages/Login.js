import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import logo from "../Images/EButler_White_logo.png";
import "./style.css";
import userService from "../Api/Users/userService";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: null, password: null };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.name !== this.state.name) {
      this.handler();
    }
  }

  onChange = (e) => {
    let { username, password } = this.state;
    switch (e.target.name) {
      case "username":
        username = e.target.value;
        break;
      case "password":
        password = e.target.value;
        break;
      default:
        return;
    }
    this.setState({ username, password });
  };

  onFinish = () => {
    userService
      .authenticate({
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        console.log(res.data)
        if (res.data.verified !== 0){
          localStorage.setItem("user-auth", res.data.token);
          localStorage.setItem("role",res.data.role);
          this.props.history.push("/");
        }
        else
          toast.warning(
            "This Email account not verified, Please check you Email",
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
      })
      .catch((err) => {
        console.log(err);
        toast.error("Username or password incorrect", { position: toast.POSITION.TOP_CENTER });
      });
  };

  componentWillUnmount() {}

  render() {
    return (
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ minHeight: "100vh" }}
      >
        <Col span={4}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
          >
            <Form.Item align="center">
              <img
                src={logo}
                className="invertBackground"
                alt="logo"
                width="100%"
              />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                name="username"
                onChange={this.onChange.bind(this)}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                onChange={this.onChange.bind(this)}
                placeholder="Password"
                type="password"
                name="password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link to="/forget_password" className="login-form-forgot">
                Forgot password
              </Link>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={this.onFinish.bind(this)}
              >
                Log in
              </Button>{" "}
              Or <Link to="/register">Register</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}
