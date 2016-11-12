import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import {Button} from 'react-native-elements';
import firebaseApp from "../components/firebaseconfig.js";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from 'react-native';

const goToContact = () => Actions.Contact();

class OwnerAccount extends Component {

  constructor(props) {
    super(props);
    this.state = { /* initial state */ };
  }

  componentWillMount(){
    AsyncStorage.getItem("loggedin").then((value) => {
      this.setState({"loggedin": value});
    }).done();

    AsyncStorage.getItem("owneremail").then((value) => {
      this.setState({"owneremail": value});
    }).done();
    //change if user is logged in blah blah blah
    //Actions.refresh({key: 'drawer', open: value => !value});
  }

  signOut(){

    AsyncStorage.setItem("loggedin", "false");

    firebaseApp.auth().signOut().then(function() {
        Alert.alert("Success","You are now signed out");
      }, function(error) {
        Alert.alert("Error","Something went wrong. Please try again")
      });

    Actions.OwnerLogin();
  }

  render() {
    return (
      <View style={styles.container}>
      <Icon name="user-secret" style={{fontSize:50, color:"#2ecc71"}}></Icon>
        <Text style={styles.welcome}>
          Owner Account. Logged in? {this.state.loggedin}
          Email:{this.state.owneremail}
        </Text>

        <Button
          raised
          borderRadius={5}
          icon={{name: 'lock'}}
          backgroundColor='#2bc064'
          fontFamily='oswald-regular'
          title={'Logout'}
          onPress={() => this.signOut()}
        />

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

export default connect(mapStateToProps, mapDispatchToProps)(OwnerAccount);
