require('babel-polyfill');
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from './store';
import App from './containers/App';


ReactDOM.render(<Provider store={store}>
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
</Provider>, document.getElementById('app'));
