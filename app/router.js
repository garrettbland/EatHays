import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from './actions';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Actions, Scene, Router, Modal} from 'react-native-router-flux';

import Drawer from './components/drawer.js';
import Home from './scenes/Home.js';
import SpecialDetail from './scenes/SpecialDetail.js';
import Directory from './scenes/Directory.js';
import Favorites from './scenes/Favorites.js';
import About from './scenes/About.js';
import Contact from './scenes/Contact.js';
import DirectoryDetail from './scenes/DirectoryDetail.js';


const styleNavigationBarStyle = {backgroundColor:"#c0392b"};
const styleTitleStyle = {color:"#FFFFFF",fontFamily:'oswald-regular'};

const toggleDrawer = () => Actions.refresh({key: 'drawer', open: value => !value });

const settingsIcon = (<Icon name="bars" size={30} color="#FFFFFF" />);
const backButtonIcon = (<Icon name="chevron-left" size={23} color="#FFFFFF" />);
const searchIcon = (<Icon name="search" size={25} color="#FFFFFF" />);

class EatHaysRouter extends Component {
  render() {
    return (
      <Router>
          <Scene key="drawer" component={Drawer} open={false} >
              <Scene key="root">
                <Scene key="Home" navigationBarStyle={styleNavigationBarStyle} titleStyle={styleTitleStyle} component={Home} type="replace" initial={true} leftTitle={settingsIcon} onLeft={toggleDrawer} title="Eat Hays"/>
                <Scene key="SpecialDetail" navigationBarStyle={styleNavigationBarStyle} titleStyle={styleTitleStyle} backTitle={backButtonIcon} hideBackImage={true} component={SpecialDetail} type="push" title="Deal of the Day" />
                <Scene key="Directory" navigationBarStyle={styleNavigationBarStyle} titleStyle={styleTitleStyle} component={Directory} type="replace" leftTitle={settingsIcon} onLeft={toggleDrawer} title="Directory" />
                <Scene key="DirectoryDetail" navigationBarStyle={styleNavigationBarStyle} titleStyle={styleTitleStyle} backTitle={backButtonIcon} hideBackImage={true} component={DirectoryDetail} type="push" title="Directory Detail" />
                <Scene key="Favorites" navigationBarStyle={styleNavigationBarStyle} titleStyle={styleTitleStyle} component={Favorites} type="replace" leftTitle={settingsIcon} onLeft={toggleDrawer} title="Favorites" />
                <Scene key="About" navigationBarStyle={styleNavigationBarStyle} titleStyle={styleTitleStyle} component={About} type="replace" leftTitle={settingsIcon} onLeft={toggleDrawer} title="About" />
                <Scene key="Contact" navigationBarStyle={styleNavigationBarStyle} titleStyle={styleTitleStyle} backTitle={backButtonIcon} hideBackImage={true} component={Contact} type="push" title="Contact" />
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
