import React, { Component } from 'react';
import {
    Table, FormGroup, Input
} from 'reactstrap';

import TaskItem from './TaskItem';

import { connect } from 'react-redux';
import * as actions from './../actions';

class TaskList extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1
        }
    }
    onChange = (event)=>{
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value 
        });
        let filterObj = {
            name: name === 'filterName' ? value : this.state.filterName,
            status: name === 'filterStatus' ? value : this.state.filterStatus
        }
        this.props.onFilterTasks(filterObj);        
    }

    render() {
        var { tasks, filterTasks, keyword, sort } = this.props;
        let { filterName, filterStatus } = this.state;
        //Filter Tasks
        if (filterTasks && filterTasks.name) {
            tasks = tasks.filter(task => {
                return task.name.toLowerCase().indexOf(filterTasks.name) !== -1
            });
        }
        tasks = tasks.filter(task => {
            if (filterTasks.status === -1) {
                return task
            } else {
                return task.status === (filterTasks.status === 1 ? true : false)
            }
        });
        // Search Tasks
        if (keyword) {
            tasks = tasks.filter(task => {
                return task.name.toLowerCase().indexOf(keyword) !== -1
            });
        }
        //sort.sort
        if(sort.sortBy === 'name'){
            tasks = tasks.sort((a, b) => {
                var nameA = a.name.toUpperCase(); // bỏ qua hoa thường
                var nameB = b.name.toUpperCase(); // bỏ qua hoa thường
                if (nameA < nameB) {
                    return -sort.sortValue;
                }
                if (nameA > nameB) {
                    return sort.sortValue  ;
                }
                // name trùng nhau
                return 0;
            });
            }else{
            tasks = tasks.sort((a, b) => {
                var nameA = a.status;
                var nameB = b.status; 
                if (nameA < nameB) {
                    return sort.sortValue;
                }
                if (nameA > nameB) {
                    return -sort.sortValue  ;
                }
                // name trùng nhau
                return 0;
            });
        }
        //Task Items
        let elementTask = tasks.map((task, index)=>{
            return <TaskItem 
                        key={task.id} 
                        index={index} 
                        task={task} 
                        editTask={this.props.editTask}
                    />
        });
        return (
            <Table bordered>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên công việc</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <FormGroup>
                                <Input 
                                    type="text" 
                                    name="filterName" 
                                    id="filterName"
                                    value={ filterName }
                                    onChange = {this.onChange}
                                />
                            </FormGroup>
                        </td>
                        <td>
                            <FormGroup>
                                <Input 
                                    type="select" 
                                    name="filterStatus" 
                                    id="filterStatus"
                                    value={ filterStatus }
                                    onChange = {this.onChange}
                                >
                                    <option value={-1}>Tất cả</option>
                                    <option value={1}>Kích hoạt</option>
                                    <option value={0}>Ẩn</option>
                                </Input>
                            </FormGroup>
                        </td>
                        <td></td>
                    </tr>   
                </thead>
                <tbody>
                    { elementTask }
                </tbody>
            </Table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        filterTasks: state.filterTasks,
        keyword: state.search,
        sort: state.sort
    }
};

let mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTasks: (filterObj) => {
            dispatch(actions.filterTasks(filterObj));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
