import React, { Component } from 'react';

import {
  Row, Col
} from 'reactstrap';

import Search from './Search';
import Sort from './Sort';

class Control extends Component {
  render() {
    return (
      <Row>
        <Col md="5">
          <Search onSearch={this.props.onSearch}/>
        </Col>
        <Col md="2">
          <Sort onSoft={this.props.onSoft} softBy={this.props.softBy} softValue={this.props.softValue} />  
        </Col>
      </Row>
    );
  }
}

export default Control;