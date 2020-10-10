import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Row, Col } from "antd";
import { UserOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import "./style.css";
import userService from "../Api/Users/userService";
export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = { password: null, confirmPassword: null};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.name !== this.state.name) {
      this.handler();
    }
  }

  onChange = (e) => {
    let { password, confirmPassword } = this.state;
    switch(e.target.name){
      case "password":password = e.target.value;break;
      case "confirmPassword":confirmPassword = e.target.value;break;
      default:return;
    }
    this.setState({ password,confirmPassword });
  };

  onFinish = () => {
    userService
      .resetPassword({password:this.state.resetPassword,confirmation_password:this.state.confirmPassword})
      .then((res) => {
        toast.success("Reset Password Email was sent.", { position: toast.POSITION.TOP_CENTER });
          this.props.history.push("/login");
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
             <Form.Item>
            <Link to="/login"><ArrowLeftOutlined/> {" "} Back</Link>
            </Form.Item>
            <Form.Item align="center">
            <Row justify="center" align="middle">
                <Col>
                  <h1>Reset Password</h1>
                  </Col>
              </Row>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                onChange={this.onChange.bind(this)}
                placeholder="Password"
                name="Password"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: "Please input your Confirm Password!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                onChange={this.onChange.bind(this)}
                placeholder="Confirm Password"
                name="confirmPassword"
              />
            </Form.Item>
            <Form.Item>
            <Row justify="center" align="middle">
                <Col>
                <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={this.onFinish.bind(this)}
              >
                Send Reset Email
              </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}
