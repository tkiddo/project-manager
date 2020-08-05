// eslint-disable-next-line no-unused-vars
import React from 'react';
import { connect } from 'react-redux';
import logo from './assets/logo.png';
import './app.scss';

import { add, minus, asyncAdd } from './store/count/action';

function App(props) {
  const { count } = props;
  return (
    <div className="app">
      <img src={logo} alt="logo" />
      <main className="app-header">Welcome</main>
      <div>{count.number}</div>
      <div>
        <button onClick={() => props.add()} type="button">
          add
        </button>
        <button onClick={() => props.minus()} type="button">
          minus
        </button>
        <button onClick={() => props.asyncAdd()} type="button">
          async add
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = ({ count }) => ({ count });
const mapDispatchToProps = (dispatch) => ({
  add: () => dispatch(add()),
  minus: () => dispatch(minus()),
  asyncAdd: () => dispatch(asyncAdd()),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(App));
