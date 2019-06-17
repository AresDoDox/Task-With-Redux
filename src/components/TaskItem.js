import React, { Component } from 'react';
import {
    Button, Badge
} from 'reactstrap';


class TaskItem extends Component {
    editTask(id){
        this.props.editTask(id);
    }

    onUpdateStatus(id) {
        this.props.onUpdateStatus(id);
    }

    onDelete(id){
        this.props.onDelete(id);
    }
    render() {
        let { index, task } = this.props;
        return (
            <tr>
                <th scope="row">{ index + 1 }</th>
                <td>{ task.namework }</td>
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

export default TaskItem;
