import React, { Component } from 'react';
import {
    Button, Badge
} from 'reactstrap';

import { connect } from 'react-redux';
import * as actions from './../actions';


class TaskItem extends Component {

    editTask = () => {
        this.props.onOpenForm();
        this.props.onEditTask(this.props.task);
    }

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDelete = () => {
        this.props.onDeleteTask(this.props.task.id);
        this.props.onCloseForm();
    }
    render() {
        let { index, task } = this.props;
        return (
            <tr>
                <th scope="row">{ index + 1 }</th>
                <td>{ task.name }</td>
                <td>
                    <Badge 
                        color={task.status ? "success" : "danger"} 
                        className="p-2"
                        onClick = {() => this.onUpdateStatus(task.id)}
                    >
                        {task.status ? "Kích hoạt" : "Ẩn"}
                    </Badge>
                </td>
                <td>
                    <Button color="warning" onClick={()=>this.editTask(task.id)}>Sửa</Button>{' '}
                    <Button color="danger" onClick={()=> this.onDelete(task.id)}>Xóa</Button>
                </td>
            </tr>
        );
    }
}

let mapStateToProps = (state) => {
    return {};
};

let mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus: (id) => {
            dispatch(actions.updateStatus(id));
        },
        onDeleteTask: (id)=>{
            dispatch(actions.deleteTask(id));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        },
        onOpenForm: () => {
            dispatch(actions.openForm());
        },
        onEditTask: (task) => {
            dispatch(actions.editTask(task));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskItem);
