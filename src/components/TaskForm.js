import React, { Component } from 'react';

import {
  Card, CardHeader, CardBody, CardFooter,
  Form, FormGroup, Label, Input, Button
} from 'reactstrap';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      namework:'',
      statuswork: false
    }
  }

  componentWillMount() {
    if(this.props.task){
      this.setState({
        id: this.props.task.id,
        namework: this.props.task.namework,
        statuswork: this.props.task.status
      });
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.task){
      this.setState({
        id: nextProps.task.id,
        namework: nextProps.task.namework,
        statuswork: nextProps.task.status
      });
    }
    if(nextProps && nextProps.task === null){
      this.setState({
        id: '',
        namework: '',
        statuswork: false
      });
    }
  }

  onChangeForm = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    if(name === 'statuswork'){
      value = value ? true : false;
    }
    this.setState({
      [name] : value
    });
  }

  onCloseForm = () => {
    this.props.onCloseForm();
  }

  onSubmit = (event) =>{
    event.preventDefault();
    this.props.onSubmit(this.state);
    // Cancel & close form
    this.onClear();
    this.onCloseForm();
  }

  onClear = () => {
    this.setState({
      namework: '',
      statuswork: false
    })
  }

  render() {
    // let { namework, status } = this.state;
    return (
      <Card>
        <CardHeader>{ this.state.id !== '' ? 'Chỉnh sửa công việc': 'Thêm công việc' }</CardHeader>
        <Form onSubmit={this.onSubmit}>
          <CardBody>
            <FormGroup>
              <Label for="namework">Tên công việc:</Label>
              <Input
                type="text"
                id="namework"
                name="namework"
                value={ this.state.namework  }
                onChange={this.onChangeForm}
              />
            </FormGroup>
            <FormGroup>
              <Label for="statuswork">Trạng thái</Label>
              <Input
                type="select"
                id="statuswork"
                name="statuswork"
                value={ this.state.statuswork }
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

export default TaskForm;