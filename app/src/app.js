// eslint-disable-next-line no-unused-vars
import React from 'react';
import './app.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SideMenu from './components/SideMenu';
import AppRoute from './route/index';
import logo from './assets/logo.png';
import Header from './components/Header';

function App() {
  return (
    <Container fluid className="app-container">
      <Row>
        <Col md={2} className="app-left">
          <Link to="/">
            <img src={logo} className="app-logo" alt="logo" />
          </Link>
          <SideMenu />
        </Col>
        <Col md={10} className="app-right">
          <Header />
          <AppRoute />
        </Col>
      </Row>
    </Container>
  );
}

export default React.memo(App);
