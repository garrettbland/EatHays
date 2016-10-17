import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { Button, FormLabel, FormInput } from 'react-native-elements'
import firebaseApp from "../components/firebaseconfig.js";
import moment from 'moment';
var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Platform,
  TextInput,
  ScrollView,
} from 'react-native';


class ReviewDetail extends Component {



  componentDidMount(){

    MessageBarManager.registerMessageBar(this.refs.alert);

    if(this.props.fromSpecial == true){
      this.setState({
        restaurantTitle:this.props.restaurantTitle,
        restaurant:this.props.restaurantTitle,
        fromSpecial:true,
      });
    }else{
      this.setState({
        restaurantTitle:"",
        fromSpecial:false,
      });
    }
  }

  constructor(props) {
    super(props);
    this.state = {restaurantTitle:"",name:"",restaurant:"",review:""};
    this.itemsRef = this.getRef().child('reviews');
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  submitReview(){

    var dateSubmitted = moment().format('LL');
    var onComplete = function(error) {
       if (error) {
         MessageBarManager.showAlert({
          viewTopOffset : Platform.OS === 'ios'? 64 : 54,
          duration:4000,
          title: 'Error',
          message: 'An error occured. Please try again',
          alertType: 'error',
          animationType:'SlideFromLeft',
          position: 'bottom',
          titleStyle: {fontFamily:'oswald-regular',color:'#FFFFFF',fontSize:20},
          stylesheetError: { backgroundColor: '#e74c3c', strokeColor:'#e74c3c' }
        });
       } else {
         MessageBarManager.showAlert({
          viewTopOffset : Platform.OS === 'ios'? 64 : 54,
          duration:4000,
          title: 'Success!',
          message: 'Your review has been saved, thank you!',
          alertType: 'success',
          animationType:'SlideFromLeft',
          position: 'bottom',
          titleStyle: {fontFamily:'oswald-regular',color:'#FFFFFF',fontSize:20},
          stylesheetSuccess: { backgroundColor: '#2bc064', strokeColor:'#2bc064' }
        });
       }
     };

    if (this.state.name == "" || this.state.restaurant == "" || this.state.review == ""){
      MessageBarManager.showAlert({
       viewTopOffset : Platform.OS === 'ios'? 64 : 54,
       duration:8000,
       title: 'Uh-oh',
       message: 'Please make sure all fields are completed before submitting',
       alertType: 'warning',
       animationType:'SlideFromLeft',
       position: 'bottom',
       titleStyle: {fontFamily:'oswald-regular',color:'#FFFFFF',fontSize:20},
       stylesheetSuccess: { backgroundColor: '#e67e22', strokeColor:'#e67e22' }
     });
    }else {
      this.itemsRef.push({
          name: this.state.name,
          restaurant: this.state.restaurant,
          review: this.state.review,
          timestamp: dateSubmitted,
        },(onComplete));

      this.setState({
        name:"",
        restaurant:"",
        review:""
    });
  }
}

  componentWillUnmount() {
    // Remove the alert located on this master page from the manager
    MessageBarManager.unregisterMessageBar();
  }

  render() {
    return (
      <View style={styles.container}>
      <ScrollView scrollable={false}>
      <FormLabel labelStyle={{fontFamily:'oswald-bold',color:"#c0392b"}}>Name</FormLabel>
      <FormInput placeholder="Your name" value={this.state.name} onChangeText={(text) => this.setState({name:text})}/>

      <FormLabel labelStyle={{fontFamily:'oswald-bold',color:"#c0392b"}}>Restaurant</FormLabel>
      {this.state.fromSpecial &&
        <FormInput placeholder="Where did you eat at?" value={this.state.restaurantTitle} onChangeText={() => console.log("TEST")}/>
      }
      {!this.state.fromSpecial &&
        <FormInput placeholder="Where did you eat at?" value={this.state.restaurant} onChangeText={(text) => this.setState({restaurant:text})}/>
      }

      <FormLabel labelStyle={{fontFamily:'oswald-bold',color:"#c0392b"}}>Review</FormLabel>
      <View style={{marginBottom:20}}>
      <FormInput
        value={this.state.review}
         multiline = {true}
         placeholder="Share your thoughts and opinions"
         onChangeText={(text) => this.setState({review:text})}
      />
      </View>

      <Button
        raised
        borderRadius={5}
        fontFamily='oswald-bold'
        icon={{name: 'mail'}}
        title='Submit Review'
        backgroundColor="#3498db"
        onPress={() => this.submitReview()}
      />
      </ScrollView>
          <MessageBarAlert ref="alert" />
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
