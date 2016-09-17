import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from './actions';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Actions, Scene, Router} from 'react-native-router-flux';

import Drawer from './components/drawer.js';
import Home from './scenes/Home.js';
import Directory from './scenes/Directory.js';
import Favorites from './scenes/Favorites.js';
import About from './scenes/About.js';
import Contact from './scenes/Contact.js';



const settingsIcon = (<Icon name="bars" size={30} />);
const toggleDrawer = () => Actions.refresh({key: 'drawer', open: value => !value });

class EatHaysRouter extends Component {
  render() {
    return (
      <Router>
          <Scene key="drawer" component={Drawer} open={false} >
            <Scene key="root">
              <Scene key="Home" component={Home} type="replace" initial={true} leftTitle={settingsIcon} onLeft={toggleDrawer} title="Eat Hays"/>
              <Scene key="Directory" component={Directory} type="replace" leftTitle={settingsIcon} onLeft={toggleDrawer} title="Directory" />
              <Scene key="Favorites" component={Favorites} type="replace" leftTitle={settingsIcon} onLeft={toggleDrawer} title="Favorites" />
              <Scene key="About" component={About} type="replace" leftTitle={settingsIcon} onLeft={toggleDrawer} title="About" />
              <Scene key="Contact" component={Contact} type="push" title="Contact" />
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
