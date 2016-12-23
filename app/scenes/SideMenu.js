import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions';
import SideMenuButtons from '../components/sideMenuButtons.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

const cutleryIcon = (<Icon name="cutlery" size={30} color="#FFFFFF" />);
const version = "1.7.3";

class Index extends Component {
  render() {
    return (
      <View style={{flex: 1,backgroundColor: '#c0392b'}}>
        <View>
          <Text style={{textAlign: 'center',marginTop: 25}}>
            <Image source={require('../images/EatHaysAppIconTransparent.png')} style={{width: 100, height: 100}}/>
          </Text>
        </View>
        <View>
          <SideMenuButtons/>
        </View>
        <View>
          <Text style={{fontSize: 20,textAlign: 'center',marginTop: 25,color:"#FFFFFF",fontFamily:'oswald-bold'}}>
            Eat Hays
          </Text>
        </View>
        <View>
          <Text style={{color:'#FFFFFF',fontSize:13,fontFamily:'oswald-regular',textAlign: 'center',}}>
            {version}
          </Text>
        </View>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Index);
