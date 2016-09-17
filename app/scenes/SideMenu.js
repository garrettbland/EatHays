import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const goToLogin = () => Actions.Directory();
const goToIndex = () => Actions.Home();
const goToAbout = () => Actions.About();
const goToFavorites = () => Actions.Favorites();

class Index extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.welcome}>
      <Icon name="cutlery" style={{fontSize:50}}></Icon>
      </Text>
        <Text style={styles.welcome}>
          Welcome to Eat Hays
        </Text>
        <Text style={styles.instructions}>
          Coming soon!
        </Text>
        <Text onPress={goToIndex}>Home Scene</Text>
        <Text onPress={goToLogin}>Directory Scene</Text>
        <Text onPress={goToFavorites}>Favorites Scene</Text>
        <Text onPress={goToAbout}>About Scene</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
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
