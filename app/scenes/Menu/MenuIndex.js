import React, { Component } from 'react';
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import Appetizers from './Appetizers.js';
import Sides from './Sides.js';
import Entrees from './Entrees.js';
import Drinks from './Drinks.js';
import Desserts from './Desserts.js';
import CustomTabBar from './CustomTabBar.js';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class MenuIndex extends Component {
  render() {
    return (
      <ScrollableTabView
        style={{backgroundColor:'#e1e8ef',paddingTop:Platform.OS === 'ios'? 64 : 54}}
        renderTabBar={() => <CustomTabBar/>}
        tabBarActiveTextColor={'black'}
        tabBarInactiveTextColor={'#7f8c8d'}
        tabBarUnderlineStyle={{backgroundColor:'#c0392b'}}
        initialPage={2}
        tabBarTextStyle={{fontFamily: 'oswald-regular',fontSize:screenWidth/15}}
      >
      <Appetizers tabLabel="Appetizers" menu={this.props.menu}/>
      <Sides tabLabel="Sides" menu={this.props.menu}/>
      <Entrees tabLabel="Entrees" menu={this.props.menu}/>
      <Drinks tabLabel="Drinks" menu={this.props.menu}/>
      <Desserts tabLabel="Desserts" menu={this.props.menu}/>
      </ScrollableTabView>
    );
  }
}

export default MenuIndex;
