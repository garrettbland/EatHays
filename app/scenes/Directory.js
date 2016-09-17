import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';


class Directory extends Component {

  constructor(props) {
    super(props);
    this.state = { /* initial state */ };
  }

  componentWillMount(){
    Actions.refresh({key: 'drawer', open: value => !value});
  }

  render() {
    return (
      <View style={styles.container}>
      <Icon name="sitemap" style={{fontSize:50,color:"#8e44ad"}}></Icon>
        <Text style={styles.welcome}>
          Directory
        </Text>
        <Text style={styles.instructions}>
          The props are {this.props.text}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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

export default connect(mapStateToProps, mapDispatchToProps)(Directory);
