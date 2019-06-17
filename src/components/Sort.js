import React, { Component } from 'react';

import {
  ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

class Sort extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }


  // componentWillReceiveProps(nextProps){
  //   console.log(nextProps);
  // }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onClick = (softBy, softValue)=>{
    this.props.onSoft(softBy, softValue);
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

export default Sort;