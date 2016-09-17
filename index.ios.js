import React, {Component} from 'react';
import {AppRegistry} from 'react-native';

import userReducers from './app/reducers';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import Router from './app/router.js';

let store = createStore(combineReducers({userReducers}));

class EatHays extends Component {
  render(){
    return (
      <Provider store={store}>
        <Router/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('EatHays', () => EatHays);
