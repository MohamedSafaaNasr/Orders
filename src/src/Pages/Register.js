import React, { Component } from "react";
import { Link, } from "react-router-dom";
import { Form, Input, Button, Row, Col,Select } from "antd";
import { UserOutlined, LockOutlined, MailOutlined,PhoneOutlined,ArrowLeftOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import "./style.css";
import userService from "../Api/Users/userService";

const { Option } = Select;

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { name:null,username: null, password: null, email:null,phone:null,role:null };
  }

  componentDidMount() {}

  onSelectChange = (value) => {
    let { role } = this.state;
    role = value;
    this.setState({ role });
  }

  onChange = (e) => {
    let { name,username, password, email,phone } = this.state;
    switch (e.target.name) {
      case "username":
        username = e.target.value;
        break;
      case "password":
        password = e.target.value;
        break;
      case "name":
        name = e.target.value;
        break;
      case "email":
        email = e.target.value;
        break;
      case "phone":
        phone = e.target.value;
        break;
      default:
        return;
    }
    this.setState({ name,username, password, email,phone });
  };

  onFinish = () => {
    userService
      .registerUser({
        name:this.state.name,
        username: this.state.username,
        password: this.state.password,
        phone:this.state.phone,
        email:this.state.email,
        role:this.state.role
      })
      .then((res) => {
        toast.success("Account Created Successfully, Please check your email for verification", { position: toast.POSITION.TOP_CENTER });
          this.props.history.push("/login");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message, { position: toast.POSITION.TOP_CENTER });
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
            <Form.Item>
              <Row justify="center" align="middle">
                <Col>
                <h1>Register</h1>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Please input your name!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                name="name"
                onChange={this.onChange.bind(this)}
                placeholder="Name"
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
                type="password"
                name="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                name="email"
                onChange={this.onChange.bind(this)}
                type="email"
                placeholder="Email"
              />
              </Form.Item>
              <Form.Item
              name="phone"
              rules={[
                { required: true, message: "Please input your phone!" },
              ]}
            >
              <Input
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                name="phone"
                onChange={this.onChange.bind(this)}
                placeholder="Phone"
              />
              </Form.Item>
              <Form.Item
              name="role"
              rules={[
                { required: true, message: "Please input your role!" },
              ]}
            >
              <Select
                prefix={<UserOutlined className="site-form-item-icon" />}
                name="role"
                onChange={this.onSelectChange.bind(this)}
                placeholder="Role"
              >
                <Option value="consumer">Consumer</Option>
                <Option value="manager">Manager</Option>
                </Select>
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
                Register
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
