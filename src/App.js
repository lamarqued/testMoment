import React from 'react';
import Container from 'react-bootstrap/Container';
import List from './components/List';
import Row from 'react-bootstrap/Row';
import TestTechniqueMoment from "./assets/TestTechniqueMoment.png";

const App = () => (
<div className="bg-color">
  <img src={TestTechniqueMoment} alt="Test technique Moment" className="title-image" />
  <Container className="minw-80">
    <Row>
      <List />
    </Row>
  </Container>
</div>
);

export default App;