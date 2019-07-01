import React, { Component } from 'react';
import './App.css';
import {
  Alert, Container, Row, Col, Button
} from 'reactstrap';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';

import { connect } from 'react-redux';
import * as actions from './actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      softBy: 'name',
      softValue: 1
    }
  }

  //Đóng/mở form
  onToggleForm  = () => {
    if(this.props.task && this.props.task.id !== ''){
      this.props.onOpenForm();
    }else{
      this.props.onToggleForm();
    };
    this.props.onClearTask({
      id: '',
      name: '',
      status: false
    });
  }

  render() {
    var { isDisplayForm } = this.props;
    return (
      <div className="App">
        <Alert color="primary">
          <h1 className="title-app">Quản lý công việc</h1>
        </Alert>
        <Container>
          <Row>
            <Col md={ isDisplayForm ? "4" : "0"}>
              <TaskForm /> 
            </Col>
            <Col md={ isDisplayForm ? "8" : "12" }>
              <Col md="12" className="p-0 mb-2">
                <Button color="primary" onClick={ this.onToggleForm }>Thêm công việc</Button>
              </Col>
              <Control/>
              <TaskList />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    isDisplayForm: state.isDisplayForm,
    task: state.task
  };
};

let mapDispatchToProps = (dispatch,action) => {
  return {
    onToggleForm: () => {
      dispatch(actions.toggleForm());
    },
    onOpenForm: () => {
      dispatch(actions.openForm());
    },
    onClearTask: (task) =>{
      dispatch(actions.editTask(task));
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);
