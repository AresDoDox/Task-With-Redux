import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions';

import {
  Card, CardHeader, CardBody, CardFooter,
  Form, FormGroup, Label, Input, Button
} from 'reactstrap';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name:'',
      status: false
    }
  }

  componentWillMount() {
    if(this.props.task){
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status
      });
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.task){
      this.setState({
        id: nextProps.task.id,
        name: nextProps.task.name,
        status: nextProps.task.status
      });
    }else{
      this.onClear();
    }
  }

  onClear = () =>{
    this.setState({
      id: '',
      name: '',
      status: false
    });
  }

  onChangeForm = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    if(name === 'status'){
      value = value ? true : false;
    }
    this.setState({
      [name] : value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSaveTask(this.state);
    // Cancel & close form
    this.onClear();
    this.props.onCloseForm();
  }

  onClear = () => {
    this.setState({
      name: '',
      status: false
    })
  }

  render() {
    // let { name, status } = this.state;
    if(!this.props.isDisplayForm) return null;  
    return (
      <Card>
        <CardHeader>{ this.state.id !== '' ? 'Chỉnh sửa công việc': 'Thêm công việc' }</CardHeader>
        <Form onSubmit={this.onSubmit}>
          <CardBody>
            <FormGroup>
              <Label for="name">Tên công việc:</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={ this.state.name  }
                onChange={this.onChangeForm}
              />
            </FormGroup>
            <FormGroup>
              <Label for="status">Trạng thái</Label>
              <Input
                type="select"
                id="status"
                name="status"
                value={ this.state.status }
                onChange={this.onChangeForm}
              >
                <option value={true}>Kích hoạt</option>
                <option value={false}>Ẩn</option>
              </Input>
            </FormGroup>
          </CardBody>
          <CardFooter>
            <Button type="submit" color="primary">Lưu lại</Button>{' '}
            <Button onClick={this.onClear}>Hủy bỏ</Button>
          </CardFooter>
        </Form>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    isDisplayForm: state.isDisplayForm,
    task: state.task
  } 
};// valiable props

const mapDispatchToProps = (dispatch, props) => {
  return {
      onSaveTask: (task) => {
        dispatch(actions.saveTask(task));
      },
      onCloseForm: () => {
        dispatch(actions.closeForm());
      }
  }
}//action props

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);