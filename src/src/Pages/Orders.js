import React, { Component } from "react";
import { Layout, Menu, Breadcrumb,Table, Input, Button, Space,Row,Col, Select } from 'antd';
import logo from "../Images/EButler_White_logo.png";
import "./style.css";
import Highlighter from 'react-highlight-words';
import { SearchOutlined, RestOutlined,PlusCircleOutlined, EditOutlined } from '@ant-design/icons';
import { toast } from "react-toastify";
import orderService from "../Api/Orders/orderService";
import CreateOperationModal from "./Components/CreateOperationModal";
import UpdateOperationModal from "./Components/UpdateOperationModal";
import moment from "moment";

const { Header, Content, Footer } = Layout;
const { Option } = Select;
export default class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOrder: null,
      show: false,
      showUpdate:false,
      selectedSearch: "OID",
      role: "consumer",
      pagination:{
        current:1,
        pageSize:100
      },
      sortedFirstNameInfo: {
        order:"descend",
        columnKey:"first_name"
      },
      sortedItemPriceInfo: {
        order:"descend",
        columnKey:"item_price"
      },
      loading: true,
    };

    this.handleEvent = this.handleEvent.bind(this);
  }

  hideModal = (value) => {
    this.setState({
      show: value,
    });
    const { pagination } = this.state;
    this.getOrders({ pagination });
  };

  hideUpdateModal = (value) => {
    this.setState({showUpdate:value,selectedOrder: null});
    const { pagination } = this.state;
    this.getOrders({ pagination });
  }

  onSelectedSearchChange =(value)=>{
    this.setState({selectedSearch: value});
  }


  search = (value)=>{
    let orders = [];
    let filterName = this.state.selectedSearch;
    console.log(filterName);
    console.log(value);
    if(value !== null)
    orderService.getOrderByFilter({[filterName]:value})
    .then(res=>{
      console.log(res.data);
      res.data.map((order)=>{
        orders.push({
        OID: order.OID,
        first_name: order.first_name,
        last_name: order.last_name,
        phone: order.phone,
        country: order.country,
        order_status: order.order_status,
        item_price: order.item_price,
        quantity: order.quantity,
        total_price: order.total_price,
        pickup_time: moment(order.pickup_time).format("DD/MM/YYYY hh:mm:ss"),
        delivery_time: moment(order.delivery_time).format("DD/MM/YYYY hh:mm:ss"),
        action:<Row gutter={24}><Col span={12}><Button type="text" onClick={()=>{
          orderService.getOrderById(order.id)
          .then((res)=>{
            this.setState({showUpdate:true,selectedOrder:{
              id:order.id,
              OID: res.data.OID,
              first_name: res.data.first_name,
              last_name: res.data.last_name,
              phone: res.data.phone,
              country: res.data.country,
              item_price: res.data.item_price,
              quantity: res.data.quantity,
              total_price: res.data.total_price,
              pickup_time: res.data.pickup_time,
              delivery_time: res.data.delivery_time
            }})
          });}
        }><EditOutlined/></Button></Col><Col span={12}><Button type="text" onClick={()=>this.deleteOrder(order.id)}><RestOutlined/></Button></Col></Row>
        });  
        this.setState({
          orders,
        }); 
    });
  })
  .catch((err) => {
    console.log(err);
    toast.error(err.message, { position: toast.POSITION.TOP_CENTER });
  });
  else {
    const { pagination } = this.state;
    this.getOrders({ pagination });
  }
  
  }

  getOrders = (params = {})=>{
    let orders = [];
      orderService.getAllOrders(params.pagination)
      .then(res=>{
        res.data.orders.map((order,i)=>{
            orders.push({
            OID: order.OID,
            first_name: order.first_name,
            last_name: order.last_name,
            phone: order.phone,
            country: order.country,
            order_status: order.order_status,
            item_price: order.item_price,
            quantity: order.quantity,
            total_price: order.total_price,
            pickup_time: moment(order.pickup_time).format("DD/MM/YYYY hh:mm:ss"),
            delivery_time: moment(order.delivery_time).format("DD/MM/YYYY hh:mm:ss"),
            action:<Row gutter={24}><Col span={12}><Button type="text" onClick={()=>{
              orderService.getOrderById(order.id)
              .then((res)=>{
                this.setState({showUpdate:true,selectedOrder:{
                  id:order.id,
                  OID: res.data.OID,
                  first_name: res.data.first_name,
                  last_name: res.data.last_name,
                  phone: res.data.phone,
                  country: res.data.country,
                  item_price: res.data.item_price,
                  quantity: res.data.quantity,
                  total_price: res.data.total_price,
                  pickup_time: res.data.pickup_time,
                  delivery_time: res.data.delivery_time
                }})
              });}
            }><EditOutlined/></Button></Col><Col span={12}><Button type="text" onClick={()=>this.deleteOrder(order.id)}><RestOutlined/></Button></Col></Row>
            });   
        });
        this.setState({
          orders,
          loading: false,
          pagination: {
            ...params.pagination,
            total: res.data.totalItems,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message, { position: toast.POSITION.TOP_CENTER });
      });
  }

  componentDidMount() {
    this.setState({role:localStorage.getItem("role")});
    const { pagination } = this.state;
    this.getOrders({pagination});
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.name !== this.state.name) {
      this.handler();
    }
  }

  componentWillUnmount() {}

  // Prototype methods, Bind in Constructor (ES2015)
  handleEvent() {}

  // Class Properties (Stage 3 Proposal)
  handler = () => {
    this.setState();
  };


  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  deleteOrder = (id)=>{
    orderService.deleteOrder(id)
    .then((res)=>{
      console.log(res.data);
      if(res.data.message !== undefined)
      toast.error(res.data.message, { position: toast.POSITION.TOP_CENTER });
      else
      toast.success("Order Deleted Successfully", { position: toast.POSITION.TOP_CENTER });
      const { pagination } = this.state;
      this.getOrders({ pagination });
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.message, { position: toast.POSITION.TOP_CENTER });
    });
  }

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  handleTableChange = (pagination, filters, sorter) => {
    this.getOrders({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  setFirstNameSort = () => {
    this.setState({
      sortedItemPriceInfo:{
        order:null,columnKey:null
      },
      sortedFirstNameInfo: {
        order: this.state.sortedFirstNameInfo.order === 'descend'? 'ascend':'descend',
        columnKey: 'first_name',
      },
    });
  };
  setItemPriceSort = () => {
    this.setState({
      sortedFirstNameInfo:{
        order:null,columnKey:null
      },
      sortedItemPriceInfo: {
        order: this.state.sortedItemPriceInfo.order === 'descend'? 'ascend':'descend',
        columnKey: 'item_price',
      },
    });
  };


  render() {
    const { orders, pagination, loading } = this.state;
    let { sortedFirstNameInfo, sortedItemPriceInfo} = this.state;
    const columns = [
      {
        title: 'OID',
        dataIndex: 'OID',
        key: 'OID',
        ...this.getColumnSearchProps('OID'),
      },
      {
        title: 'First Name',
        dataIndex: 'first_name',
        key: 'first_name',
        sorter: (a, b) => a.first_name > b.first_name,
        sortOrder: sortedFirstNameInfo.columnKey === 'first_name' && sortedFirstNameInfo.order,
        ...this.getColumnSearchProps('first_name'),
        
      },
      {
        title: 'Last Name',
        dataIndex: 'last_name',
        key: 'last_name',
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
      },
      {
        title: 'Order Status',
        dataIndex: 'order_status',
        key: 'order_status',
      },
      {
        title: 'Item Price',
        dataIndex: 'item_price',
        key: 'item_price',
        sorter: (a, b) => a.item_price - b.item_price,
        sortOrder: sortedItemPriceInfo.columnKey === 'item_price' && sortedItemPriceInfo.order,
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        title: 'Total Price',
        dataIndex: 'total_price',
        key: 'total_price',
        ...this.getColumnSearchProps('total_price'),
      },
      {
        title: 'Pickup Time',
        dataIndex: 'pickup_time',
        key: 'pickup_time',
        width:"20%"
      },
      {
        title: 'Delivery Time',
        dataIndex: 'delivery_time',
        key: 'delivery_time',
        width:"20%"
      },
      {
        title: 'Action',
        dataIndex: this.state.role !== "consumer" ?'action':null,
        key: this.state.role !== "consumer" ?'action':null,
        width:"15%"
      },
    ];
    return <Layout className="layout">
        <Header>
      <div className="logo"/>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
      <img src={logo} alt="logo" width="5%" className="logo p-0 m-0"/> 
        <Menu.Item key="1" style={{float:"right"}} onClick={()=>{localStorage.clear(); this.props.history.push("/login");}}>Logout</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 20px 0 20px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
  <Breadcrumb.Item><h1>Orders{" "}{this.state.role !== "consumer" &&<Button type="text" onClick={()=>this.setState({show:true})}><PlusCircleOutlined/></Button>}</h1></Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content" style={{ minHeight:"500px"}}>
        <Space style={{ marginBottom: 16, }}>
        <Button onClick={this.setFirstNameSort}>Sort By First Name</Button>
        <Button onClick={this.setItemPriceSort}>Sort By Item Price</Button>
        <Button onClick={()=>this.getOrders({ pagination })}>Clear</Button>
        <Input.Group compact>
        <Select defaultValue="OID" onChange={this.onSelectedSearchChange.bind(this)}>
          <Option value="OID">OID</Option>
          <Option value="first_name">First Name</Option>
          <Option value="item_price">Item Price</Option>
        </Select>
        <Input.Search style={{ width: '60%' }} placeholder="Search" onSearch={value=>this.search(value)}/>
        </Input.Group>
        </Space>
        <Row>
          <Col>
        <Table columns={columns}  rowKey={record => record.id} dataSource={orders!== null ? orders : null} pagination={pagination} loading={loading}  onChange={this.handleTableChange}/>
        </Col>
        </Row>
        </div>
        <CreateOperationModal visible={this.state.show} hideModal={this.hideModal}/>
        {this.state.selectedOrder !== null && <UpdateOperationModal orderData={this.state.selectedOrder} visible={this.state.showUpdate} hideModal={this.hideUpdateModal}/>}
    </Content>
    <Footer style={{ textAlign: 'center' }}>Assessment ©2020 Created for E-Butler</Footer>
  </Layout>;
  }
}
