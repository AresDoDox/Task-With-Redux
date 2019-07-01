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
          <Search/>
        </Col>
        <Col md="2">
          <Sort/>  
        </Col>
      </Row>
    );
  }
}

export default Control;