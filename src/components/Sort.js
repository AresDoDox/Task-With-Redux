import React, { Component } from 'react';

import {
  ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

import { connect } from 'react-redux';
import * as actions from './../actions';

class Sort extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onClick = (sortBy, sortValue)=>{
    let sortObj = {
      sortBy,
      sortValue
    }
    this.props.onSort(sortObj);
  }


  render() {
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret color="primary">
          Sắp xếp
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={ () => this.onClick('name', 1)}>Tên A-Z</DropdownItem>
          <DropdownItem onClick={ () => this.onClick('name', -1)}>Tên Z-A</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={ () => this.onClick('status', 1)}>Trạng thái Kích hoạt</DropdownItem>
          <DropdownItem onClick={ () => this.onClick('status', -1)}>Trạng thái Ẩn</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

let mapDispatchToProps = (dispatch,action) => {
  return {
    onSort: (sortObj) => {
      dispatch(actions.sortTasks(sortObj));
    }
  };
};

export default connect(null,mapDispatchToProps)(Sort);