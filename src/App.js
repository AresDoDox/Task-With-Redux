import React, { Component } from 'react';
import './App.css';
import {
  Alert, Container, Row, Col, Button
} from 'reactstrap';
import randomstring from 'randomstring';

import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [], //id, namework, status 
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        filterName: '',
        filterStatus: -1
      },
      keyword: '',
      softBy: 'name',
      softValue: 1
    }
  }

  //Get data
  componentWillMount() {
    if(localStorage && localStorage.getItem('tasks')){
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      });
    }
  }

  //Dữ liệu mẫu
  createSampleData = () => {
    let tasks = [
      {
        id: randomstring.generate(5),
        namework: 'Học HTML',
        status: true
      },
      {
        id: randomstring.generate(5),
        namework: 'Học CSS',
        status: true
      },
      {
        id: randomstring.generate(5),
        namework: 'Học ReactJS Basic',
        status: false
      }
    ];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.setState({
      tasks: tasks
    });
  }

  //Đóng/mở form
  onToggleForm  = () => {
    if(this.state.isDisplayForm && this.state.taskEditing !== null ){
      this.setState({
        isDisplayForm: true,
        taskEditing: null
      });
    }else{
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null
      });
    }
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    });
  }
  //Đóng Form
  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
      taskEditing: null
    });
  }

  //Click submit
  onSubmit = (data) => {
    let { tasks } = this.state;
    if(data.id === ''){
      data.id = randomstring.generate(5);
      tasks.push(data)
    }else{
      let index = this.findIndex(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks,
      taskEditing: null
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  //Chỉnh sửa form
  editTask = (id) => {
    this.onShowForm();
    let { tasks } = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];
    this.setState({
      taskEditing
    });

    
    
  }

  //Cập nhật status
  onUpdateStatus = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if( index !== -1){
      tasks[index].status = !tasks[index].status
    }
    this.setState({
      tasks
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
  }


  //Xóa phần tử
  onDelete = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    tasks.splice(index, 1)
    this.setState({
      tasks
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
  }

  //Tìm index
  findIndex = (id) => {
    var { tasks } = this.state;
    let result = -1;
    tasks.forEach( (task,index) => {
      if(task.id === id){
        return result = index; 
      }
    });
    return result;
  }

  //Filter
  onFilter = (filterName, filterStatus) => {
    let status = parseInt(filterStatus,10);
    this.setState({
      filter: {
        filterName: filterName.toLowerCase(),
        filterStatus : status
      }
    });
  }
  //Search
  onSearch = (keyword) => {
    if(keyword){
      this.setState({
        keyword
      });
    }

  }
  //Soft
  onSoft = (softBy, softValue) => {
    this.setState({
          softBy: softBy,
          softValue: softValue
    });
  }

  render() {
    var { tasks, isDisplayForm, taskEditing, filter, keyword, softBy, softValue } = this.state;
    if(filter && filter.filterName){
      tasks = tasks.filter(task => {
        return task.namework.toLowerCase().indexOf(filter.filterName) !== -1
      });
    }

    tasks = tasks.filter(task => {
        if(filter.filterStatus === -1 ){
          return task
        }else{
          return task.status === (filter.filterStatus === 1 ? true : false)
        }  
    });

    if(keyword){
      tasks = tasks.filter(task => {
        return task.namework.toLowerCase().indexOf(keyword) !== -1
      });
    }
    //Soft
    if(softBy === 'name'){
      tasks = tasks.sort((a, b) => {
        var nameA = a.namework.toUpperCase(); // bỏ qua hoa thường
        var nameB = b.namework.toUpperCase(); // bỏ qua hoa thường
        if (nameA < nameB) {
          return -softValue;
        }
        if (nameA > nameB) {
          return softValue  ;
        }
        // name trùng nhau
        return 0;
      });
    }else{
      tasks = tasks.sort((a, b) => {
        var nameA = a.status;
        var nameB = b.status; 
        if (nameA < nameB) {
          return softValue;
        }
        if (nameA > nameB) {
          return -softValue  ;
        }
        // name trùng nhau
        return 0;
      });
    }

    let elementTaskForm = isDisplayForm 
          ? <TaskForm  
              onSubmit={ this.onSubmit } 
              onCloseForm={ this.onCloseForm }
              task = {taskEditing}
            /> 
          : '';
    return (
      <div className="App">
        <Alert color="primary">
          <h1 className="title-app">Quản lý công việc</h1>
        </Alert>
        <Container>
          <Row>
            <Col md={ isDisplayForm ? "4" : "0"}>
              { elementTaskForm }
            </Col>
            <Col md={ isDisplayForm ? "8" : "12" }>
              <Col md="12" className="p-0 mb-2">
                <Button color="primary" onClick={ this.onToggleForm }>Thêm công việc</Button>{' '}
                <Button color="danger" onClick={this.createSampleData}>Tạo dữ liệu mẫu</Button>{' '}
              </Col>
              <Control 
                onSearch={this.onSearch}
                onSoft={this.onSoft}
                softBy={softBy}
                softValue={softValue}
              />
              <TaskList 
                tasks={ tasks } 
                editTask={this.editTask}
                onUpdateStatus = {this.onUpdateStatus}
                onDelete = {this.onDelete}
                onFilter = {this.onFilter}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default App;
