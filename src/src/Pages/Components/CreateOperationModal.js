import React, { Component } from "react";
import { Form, Input,Modal } from "antd";
import { UserOutlined,PhoneOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import "../style.css";
import orderService from "../../Api/Orders/orderService";


export default class CreateOperationModal extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      first_name: null,
      last_name: null,
      phone: null,
      country: null,
      item_price: null,
      quantity: null,
      total_price: null,
      pickup_time: null,
      delivery_time: null
    };
  }


  handleCancel = e => {
    this.props.hideModal(false);
  };

  componentDidMount() {}

  onSelectChange = (value) => {
    let { role } = this.state;
    role = value;
    this.setState({ role });
  }

  onChange = (e) => {
    let { first_name,last_name,phone,country,item_price,quantity,total_price,pickup_time,delivery_time } = this.state;
    switch (e.target.name) {
      case "first_name":
        first_name = e.target.value;
        break;
      case "last_name":
        last_name = e.target.value;
        break;
      case "country":
        country = e.target.value;
        break;
      case "phone":
          phone = e.target.value;
          break;
        case "item_price":
          item_price = e.target.value;
          break;
        case "quantity":
          quantity = e.target.value;
          break;
        case "total_price":
          total_price = e.target.value;
          break;
        case "pickup_time":
          pickup_time = e.target.value;
          break;
        case "delivery_time":
          delivery_time = e.target.value;
          break;
      default:
        return;
    }
    this.setState({first_name,last_name,country,phone,item_price,total_price,quantity,pickup_time,delivery_time });
  };

  onFinish = () => {
    orderService
      .createOrder({
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        phone: this.state.phone,
        country: this.state.country,
        item_price: this.state.item_price,
        quantity: this.state.quantity,
        total_price: this.state.total_price,
        pickup_time: this.state.pickup_time,
        delivery_time: this.state.delivery_time
      })
      .then((res) => {
        toast.success("Order Created Successfully", { position: toast.POSITION.TOP_CENTER });
        this.props.hideModal(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message, { position: toast.POSITION.TOP_CENTER });
      });
  };

  componentWillUnmount() {}

  render() {
    return (
      <Modal
          title="Create Order"
          visible={this.props.visible}
          onOk={this.onFinish}
          onCancel={this.handleCancel}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="first_name"
              rules={[
                { required: true, message: "Please input your First Name!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                name="first_name"
                onChange={this.onChange.bind(this)}
                placeholder="First Name"
              />
              </Form.Item>
            <Form.Item
              name="last_name"
              rules={[
                { required: true, message: "Please input your Last Name!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                name="last_name"
                onChange={this.onChange.bind(this)}
                placeholder="Last Name"
              />
            </Form.Item>
            <Form.Item>
              <Input
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                name="phone"
                onChange={this.onChange.bind(this)}
                placeholder="Phone"
              />
              </Form.Item>
              <Form.Item>
              <Input
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                name="country"
                onChange={this.onChange.bind(this)}
                placeholder="Country"
              />
              </Form.Item>
              <Form.Item
              name="item_price"
              rules={[
                { required: true, message: "Please input your Item Price!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                name="item_price"
                onChange={this.onChange.bind(this)}
                placeholder="item_price"
              />
            </Form.Item>
            <Form.Item
              name="quantity"
              rules={[
                { required: true, message: "Please input your Quantity" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                name="quantity"
                onChange={this.onChange.bind(this)}
                placeholder="quantity"
              />
            </Form.Item>
            <Form.Item
              name="total_price"
              rules={[
                { required: true, message: "Please input your Total Price!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                name="total_price"
                onChange={this.onChange.bind(this)}
                placeholder="total_price"
              />
            </Form.Item>
            <Form.Item
              name="pickup_time"
              rules={[
                { required: true, message: "Please input your Pickup Time!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                name="pickup_time"
                onChange={this.onChange.bind(this)}
                placeholder="pickup_time"
              />
            </Form.Item>
            <Form.Item
              name="delivery_time"
              rules={[
                { required: true, message: "Please input your Deliveru Time!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                name="delivery_time"
                onChange={this.onChange.bind(this)}
                placeholder="delivery_time"
              />
            </Form.Item>
          </Form>
      </Modal>
    );
  }
}