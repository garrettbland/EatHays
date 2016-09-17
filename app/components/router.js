import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Actions, Scene, Router} from 'react-native-router-flux';

import Directory from '../scenes/Directory.js';
import About from '../scenes/About.js';
import Index from '../index.js';
import Drawer from './drawer.js';


const settingsIcon = (<Icon name="bars" size={30} />);
const toggleDrawer = () => Actions.refresh({key: 'drawer', open: value => !value });

class EatHaysRouter extends Component {
  render() {
    return (
      <Router>
          <Scene key="drawer" component={Drawer} open={false} >
            <Scene key="root">
              <Scene key="Index" component={Index} type="replace" initial={true} leftTitle={settingsIcon} onLeft={toggleDrawer} title="Eat Hays"/>
              <Scene key="Directory" component={Directory} type="replace" leftTitle={settingsIcon} onLeft={toggleDrawer} title="Directory" />
              <Scene key="About" component={About} type="replace" leftTitle={settingsIcon} onLeft={toggleDrawer} title="About" />
            </Scene>
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
