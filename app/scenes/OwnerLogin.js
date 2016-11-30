import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import { Actions } from 'react-native-router-flux';
import {FormLabel, FormInput, Button} from 'react-native-elements';
var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;
import firebaseApp from "../components/firebaseconfig.js";
import {
  Text,
  View,
  Alert,
  Platform,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';

class OwnerLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      loading:false,
    };
    AsyncStorage.getItem("loggedin").then((value) => {
      this.setState({"loggedin": value});
    }).done();
  }

  componentDidMount(){
    MessageBarManager.registerMessageBar(this.refs.alert);
  }

  componentWillMount() {
    Actions.refresh({key: 'drawer', open: value => !value});
  }

  componentWillUnmount() {
    MessageBarManager.unregisterMessageBar();
  }

  login(){
    var stopLoading = ()=>this.setState({loading:false});

    if (this.state.email == "" || this.state.password == "" ){
      MessageBarManager.showAlert({
       viewTopOffset : Platform.OS === 'ios'? 64 : 54,
       duration:8000,
       title: 'Uh-oh',
       message: 'Please make sure all fields are completed before submitting',
       alertType: 'warning',
       animationType:'SlideFromLeft',
       position: 'top',
       titleStyle: {fontFamily:'oswald-regular',color:'#FFFFFF',fontSize:20},
       stylesheetSuccess: { backgroundColor: '#e67e22', strokeColor:'#e67e22' }
     });
    }else {
      this.setState({loading:true});
      var email = this.state.email;
      var password = this.state.password;

      firebaseApp.auth().signInWithEmailAndPassword(email, password).then(function() {
        //successful login. Go to account page
        AsyncStorage.setItem("loggedin", "true");
        AsyncStorage.setItem("owneremail", email.toLowerCase());
        Actions.OwnerAccount();
      }, function(error){
        //error login. Show message bar banner
        Alert.alert("Error","Incorrect username or password. Please try again.");
        this.setState({loading:false});
      }.bind(this));
    }
  }


  render() {
    if(this.state.loggedin == "true"){
      Actions.OwnerAccount();
      return(null);
    }else{
      return (
        <View style={{flex: 1,paddingTop:Platform.OS === 'ios'? 64 : 54,backgroundColor:'#e1e8ef'}}>
          <View>
            <FormLabel labelStyle={{fontFamily:'oswald-bold',color:"#c0392b"}}>Email</FormLabel>
            <FormInput autoCorrect={false} value={this.state.email} autoFocus={true} placeholder="Email"  onChangeText={(text) => this.setState({email:text})}/>
          </View>
          <View>
            <FormLabel labelStyle={{fontFamily:'oswald-bold',color:"#c0392b"}}>Password</FormLabel>
            <FormInput autoCorrect={false} value={this.state.password} secureTextEntry={true} placeholder="Password"  onChangeText={(text) => this.setState({password:text})}/>
          </View>
          <View style={{paddingTop:15}}>
            <Button
              raised
              borderRadius={5}
              icon={{name: 'lock'}}
              backgroundColor='#2bc064'
              fontFamily='oswald-regular'
              title={'Login'}
              onPress={() => this.login()}
            />
          </View>
          <View style={{paddingTop:15}}>
            {this.state.loading &&
              <ActivityIndicator
                size="large"
                color="#3498db"
                style={{marginTop:5}}
              />
            }
          </View>
          <MessageBarAlert ref="alert" />
        </View>
      );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(OwnerLogin);
