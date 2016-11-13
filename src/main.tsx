import React = require('react');
import ReactDOM = require('react-dom');
import Redux = require('redux');
import ReactRedux = require('react-redux');
import App = require('containers/app');
import appReducer = require('model/reducer');

const store: Redux.Store<any> = Redux.createStore(appReducer, {});
const Provider = ReactRedux.Provider;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('mandarin-app')
);
