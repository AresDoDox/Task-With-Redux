import React, { Component } from 'react';

import {
  FormGroup, Label, Input, Button
} from 'reactstrap';

import { connect } from 'react-redux';
import * as actions from './../actions';

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      keyword: ''
    }
  }

  onChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value
    });
  }

  onSearch = () => {
    this.props.onSearch(this.state.keyword);
  }
  render() {
    let { keyword } = this.state
    return (
      <FormGroup className="form-search">
        <Label for="searchword" hidden>Tìm kiếm</Label>
        <Input 
            type="text" 
            name="keyword" 
            id="keyword"
            value={ keyword }
            onChange = {this.onChange} 
            placeholder="Nhập từ khóa" 
        />
        <Button color="primary" onClick={this.onSearch} >Tìm</Button>
      </FormGroup>
    );
  }
}

let mapDispatchToProps = (dispatch,action) => {
  return {
    onSearch: (keyword) => {
      dispatch(actions.searchTasks(keyword));
    }
  };
};

export default connect(null,mapDispatchToProps)(Search);