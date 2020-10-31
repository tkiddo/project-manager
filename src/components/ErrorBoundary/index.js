/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.logErrorToMyService(error, errorInfo);
  }

  // eslint-disable-next-line class-methods-use-this
  logErrorToMyService(error, errorInfo) {
    ipcRenderer.send('log-error', {
      name: error.name,
      message: error.message,
      errorInfo,
      time: new Date().toTimeString()
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <h1>Something went wrong.</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

ErrorBoundary.defaultProps = {
  children: null
};
