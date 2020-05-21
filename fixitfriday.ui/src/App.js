import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Header = () => ( 
  <Row className="justify-content-md-center">
    <h1 className="header">Welcome To Fix it Fridays</h1> 
  </Row>
)

const App = () => (
  <Container className="p-3">
    <Jumbotron>
      <Header/>
    </Jumbotron>
  </Container>
);

export default App;
