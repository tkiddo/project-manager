// eslint-disable-next-line no-unused-vars
import React from 'react';
import './app.scss';
import { Container, Row, Col } from 'react-bootstrap';
import SideMenu from './components/SideMenu';
import AppRoute from './route/index';
import logo from './assets/logo.png';
import { Link } from 'react-router-dom';

function App(props) {
  return (
    <Container fluid className="app-container">
      <Row>
        <Col md={2} className="app-left">
          <Link to="/">
            <img src={logo} className="app-logo" />
          </Link>
          <SideMenu></SideMenu>
        </Col>
        <Col md={10} className="app-right">
          <AppRoute />
        </Col>
      </Row>
    </Container>
  );
}

export default React.memo(App);
