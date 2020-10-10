import React, { Component } from "react";
import { Form, Input,Modal } from "antd";
import { UserOutlined,PhoneOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import "../style.css";
import orderService from "../../Api/Orders/orderService";


export default class UpdateOperationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData:this.props.orderData,
    };
  }


  handleCancel = e => {
    this.props.hideModal(false);
  };

  componentDidMount() {
  }

  onSelectChange = (value) => {
    let { role } = this.state;
    role = value;
    this.setState({ role });
  }

  onChange = (e) => {
    let orderData = this.state.orderData;
    switch (e.target.name) {
      case "first_name":
        orderData.first_name = e.target.value;
        break;
      case "last_name":
        orderData.last_name = e.target.value;
        break;
      case "country":
        orderData.country = e.target.value;
        break;
      case "phone":
          orderData.phone = e.target.value;
          break;
        case "item_price":
          orderData.item_price = e.target.value;
          break;
        case "quantity":
          orderData.quantity = e.target.value;
          break;
        case "total_price":
          orderData.total_price = e.target.value;
          break;
        case "pickup_time":
          orderData.pickup_time = e.target.value;
          break;
        case "delivery_time":
          orderData.delivery_time = e.target.value;
          break;
      default:
        return;
    }
    this.setState({ orderData });
  };

  onFinish = () => {
    console.log(this.state.orderData);
    orderService
      .updateOrder(this.state.orderData.id,{
        first_name: this.state.orderData.first_name,
        last_name: this.state.orderData.last_name,
        phone: this.state.orderData.phone,
        country: this.state.orderData.country,
        item_price: this.state.orderData.item_price,
        quantity: this.state.orderData.quantity,
        total_price: this.state.orderData.total_price,
        pickup_time: this.state.orderData.pickup_time,
        delivery_time: this.state.orderData.delivery_time
      })
      .then((res) => {
        toast.success("Order Updated Successfully", { position: toast.POSITION.TOP_CENTER });
        this.setState({orderData: null});
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
          title="Update Order"
          visible={this.props.visible}
          onOk={this.onFinish}
          onCancel={this.handleCancel}
        >
          <Form
            name="normal_login"
            className="login-form"
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
                defaultValue={this.state.orderData !== null ? this.state.orderData.first_name : null}
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
                defaultValue={this.state.orderData !== null ? this.state.orderData.last_name: null}
              />
            </Form.Item>
            <Form.Item>
              <Input
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                name="phone"
                onChange={this.onChange.bind(this)}
                placeholder="Phone"
                defaultValue={this.state.orderData !== null ? this.state.orderData.phone: null}
              />
              </Form.Item>
              <Form.Item>
              <Input
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                name="country"
                onChange={this.onChange.bind(this)}
                placeholder="Country"
                defaultValue={this.state.orderData !== null ? this.state.orderData.country: null}
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
                defaultValue={this.state.orderData !== null ? this.state.orderData.item_price: null}
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
                defaultValue={this.state.orderData !== null ? this.state.orderData.quantity: null}
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
                defaultValue={this.state.orderData !== null ? this.state.orderData.total_price: null}
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
                defaultValue={this.state.orderData !== null ? this.state.orderData.pickup_time: null}
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
                defaultValue={this.state.orderData !== null ? this.state.orderData.delivery_time:null}
              />
            </Form.Item>
          </Form>
      </Modal>
    );
  }
}