import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import {FormLabel, FormInput, Button} from 'react-native-elements';
var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;
import firebaseApp from "../components/firebaseconfig.js";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Platform,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';

const goToContact = () => Actions.Contact();

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
    // Remove the alert located on this master page from the manager
    MessageBarManager.unregisterMessageBar();
  }

  stopLoading(){
    //error login. Show message bar banner
    MessageBarManager.showAlert({
     viewTopOffset : Platform.OS === 'ios'? 64 : 54,
     duration:4000,
     title: 'Error',
     message: 'Incorrect username or password. Please try again',
     alertType: 'error',
     animationType:'SlideFromLeft',
     position: 'top',
     titleStyle: {fontFamily:'oswald-regular',color:'#FFFFFF',fontSize:20},
     stylesheetError: { backgroundColor: '#e74c3c', strokeColor:'#e74c3c' },
     onShow:()=>this.setState({loading:false})
   });
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
<<<<<<< HEAD
          Alert.alert("Error","Incorrect username or password. Please try again.");
          this.setState({loading:false})
=======
          MessageBarManager.showAlert({
           viewTopOffset : Platform.OS === 'ios'? 64 : 54,
           duration:4000,
           title: 'Error',
           message: 'Incorrect username or password. Please try again',
           alertType: 'error',
           animationType:'SlideFromLeft',
           position: 'top',
           titleStyle: {fontFamily:'oswald-regular',color:'#FFFFFF',fontSize:20},
           stylesheetError: { backgroundColor: '#e74c3c', strokeColor:'#e74c3c' },
           onShow:()=>this.setState({loading:false})
         });
>>>>>>> 387a60b7c8530556fca0bd32a655f36fd51ca0e4

      }.bind(this));



}
  }


  render() {

    if(this.state.loggedin == "true"){
        Actions.OwnerAccount();
        return(null)

    }else{

    return (
      <View style={styles.container}>


        <FormLabel labelStyle={{fontFamily:'oswald-bold',color:"#c0392b"}}>Email</FormLabel>
        <FormInput autoCorrect={false} value={this.state.email} autoFocus={true} placeholder="Email"  onChangeText={(text) => this.setState({email:text})}/>

        <FormLabel labelStyle={{fontFamily:'oswald-bold',color:"#c0392b"}}>Password</FormLabel>
        <FormInput autoCorrect={false} value={this.state.password} secureTextEntry={true} placeholder="Password"  onChangeText={(text) => this.setState({password:text})}/>

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
          {
            this.state.loading &&
              <ActivityIndicator
                size="large"
                color="#3498db"
                style={styles.activityStyle}
              />
          }
        </View>

        <MessageBarAlert ref="alert" />
      </View>
    );
  }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:Platform.OS === 'ios'? 64 : 54,
    backgroundColor:'#e1e8ef',
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

export default connect(mapStateToProps, mapDispatchToProps)(OwnerLogin);
