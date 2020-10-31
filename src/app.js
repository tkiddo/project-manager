// eslint-disable-next-line no-unused-vars
import React from 'react';
import './app.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { ipcRenderer } from 'electron';
import SideMenu from './components/SideMenu';
import AppRoute from './route/index';
import logo from './assets/logo.png';
import Header from './components/Header';
import useToast from './hooks/useToast';

function App() {
  const [showToast] = useToast();
  ipcRenderer.on('error', (event, arg) => {
    showToast(arg);
  });
  return (
    <Container fluid className="app-container">
      <Row>
        <Col md={2} className="app-left">
          <img src={logo} className="app-logo" alt="logo" />
          <SideMenu />
        </Col>
        <Col md={10} className="app-right">
          <Header />
          <div className="app-main">
            <AppRoute />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default React.memo(App);
