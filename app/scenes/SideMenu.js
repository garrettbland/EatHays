import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions';
import SideMenuButtons from '../components/sideMenuButtons.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const cutleryIcon = (<Icon name="cutlery" size={30} color="#FFFFFF" />);

class Index extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.centerText}>
        {cutleryIcon}
      </Text>

            <SideMenuButtons/>

        <Text style={styles.centerText}>
          Eat Hays
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c0392b',
  },
  centerText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 25,
    color:"#FFFFFF",
    fontFamily:'oswald-bold'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

function mapStateToProps(state){
  return {
    user:state.userReducers.user,
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
