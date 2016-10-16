import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { Button, FormLabel, FormInput } from 'react-native-elements'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Platform,
  TextInput,
} from 'react-native';


class ReviewDetail extends Component {

  componentDidMount(){
    if(this.props.fromSpecial == true){
      this.setState({
        restaurantTitle:this.props.restaurantTitle
      });
    }else{
      this.setState({
        restaurantTitle:""
      });
    }
  }

  constructor(props) {
    super(props);
    this.state = {restaurantTitle:""};
  }

  render() {
    return (
      <View style={styles.container}>
      <FormLabel>Name</FormLabel>
      <FormInput placeholder="Your name" onChangeText={() => console.log("TEST")}/>

      <FormLabel>Restaurant</FormLabel>
      <FormInput placeholder="Where did you eat at?" value={this.state.restaurantTitle} onChangeText={() => console.log("TEST")}/>

      <FormLabel>Restaurant</FormLabel>
      <FormInput placeholder="Where did you eat at?" onChangeText={() => console.log("TEST")}/>

      <FormLabel>Review</FormLabel>
      <FormInput
      multiline = {true}
         numberOfLines = {4}
         placeholder="Share your thoughts and opinions"
         onChangeText={() => console.log("TEST")}
      />

      <Button
        raised
        borderRadius={5}
        buttonStyle={{marginTop:10}}
        icon={{name: 'mail'}}
        title='Submit Review'
        backgroundColor="#3498db"
        onPress={() => console.log("submit review")}
      />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:Platform.OS === 'ios'? 64 : 54,
  },
  disclaimer: {
    fontSize: 12,
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

export default connect(mapStateToProps, mapDispatchToProps)(ReviewDetail);
