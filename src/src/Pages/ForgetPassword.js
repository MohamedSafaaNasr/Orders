import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Row, Col } from "antd";
import { UserOutlined,ArrowLeftOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import "./style.css";
import userService from "../Api/Users/userService";

export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = { email: null};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.name !== this.state.name) {
      this.handler();
    }
  }

  onChange = (e) => {
    let { email } = this.state;
    email = e.target.value;
    this.setState({ email });
  };

  onFinish = () => {
    userService
      .forgetPassword(this.state.email)
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
                  <h1>Forget Password</h1>
                  </Col>
              </Row>
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Email!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                onChange={this.onChange.bind(this)}
                placeholder="Email"
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
