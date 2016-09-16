import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/index.js';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Scene, Router} from 'react-native-router-flux';

import Login from '../scenes/login.js';
import Index from '../index.js';

const settingsIcon = (<Icon name="bars" size={30} />)

class EatHaysRouter extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="Index" component={Index} title="Eat Hays" initial={true} leftTitle={settingsIcon} onLeft={() => console.log("Control Panel")}/>
          <Scene key="Login" component={Login} title="Login" />
        </Scene>
      </Router>
    );
  }
}


function mapStateToProps(state){
  return {
    user:state.userReducers.user,
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EatHaysRouter);
