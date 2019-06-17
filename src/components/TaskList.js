import React, { Component } from 'react';
import {
    Table, FormGroup, Input
} from 'reactstrap';

import TaskItem from './TaskItem';

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
        this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus,
        );
        
        
    }

    render() {
        var { tasks } = this.props;
        let { filterName, filterStatus } = this.state;
        let elementTask = tasks.map((task, index)=>{
            return <TaskItem 
                        key={task.id} 
                        index={index} 
                        task={task} 
                        editTask={this.props.editTask}
                        onUpdateStatus = {this.props.onUpdateStatus}
                        onDelete = {this.props.onDelete}
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

export default TaskList;
