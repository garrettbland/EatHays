import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import {Button, List, ListItem} from 'react-native-elements';
import firebaseApp from "../components/firebaseconfig.js";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  Platform,
  ScrollView,
} from 'react-native';

const goToContact = () => Actions.Contact();





class OwnerAccount extends Component {

  constructor(props) {
    super(props);
    this.state = { /* initial state */ };

  }

  componentWillMount(){

    AsyncStorage.getItem("owneremail").then((value) => {
      this.setState({"owneremail": value});
    }).then(res => {
      this.getServerInfo()
    })
  }


  getRef() {
    return firebaseApp.database().ref();
  }

  getServerInfo(){
    this.itemsRef = this.getRef().child('members');
    this.listenForItems(this.itemsRef);
  }

  listenForItems(itemsRef) {

    var asyncEmail = this.state.owneremail;

    itemsRef.orderByChild("ownerEmail").startAt(asyncEmail).endAt(asyncEmail).on('value', (snap) => {

      items = [];
      snap.forEach((child) => {
        items.push({
          membershipStarted: child.val().membershipStarted,
          monthlyCharge: child.val().monthlyCharge,
          ownerEmail: child.val().ownerEmail,
          ownerRestaurant: child.val().ownerRestaurant,
          paymentDate: child.val().paymentDate,
          paymentDetails: child.val().paymentDetails,
          paymentHistory: child.val().paymentHistory,
          _key: child.key,
        });
      });


      this.setState({
        membershipStarted: items[0].membershipStarted,
        monthlyCharge: items[0].monthlyCharge,
        ownerEmail: items[0].ownerEmail,
        ownerRestaurant: items[0].ownerRestaurant,
        paymentDate: items[0].paymentDate,
        paymentDetails: items[0].paymentDetails,
        paymentHistory: items[0].paymentHistory,
      });

    });
  }

  signOut(){

    AsyncStorage.setItem("loggedin", "false");
    AsyncStorage.setItem("owneremail", "null");

    firebaseApp.auth().signOut().then(function() {
        Alert.alert("Success","You are now signed out");
      }, function(error) {
        Alert.alert("Error","Something went wrong. Please try again")
      });

    Actions.OwnerLogin();
  }

  render() {
    const titleStyle = {color:"#c0392b", fontFamily:'oswald-regular', fontSize:18};
    const subtitleStyle = {color:'#95a5a6', fontFamily:'oswald-regular', fontSize:13};
    const paymentHistory = () => Actions.OwnerPaymentHistory({paymentHistory:this.state.paymentHistory})
    const list = [
      {
        title: 'Your restaurant',
        subtitle:this.state.ownerRestaurant,
        icon: 'thumb-up',
        iconColor:'#c0392b',
        fontFamily:"Verdana",
        righticon:'',
      },
      {
        title: 'Account Email',
        subtitle:this.state.ownerEmail,
        icon: 'map',
        iconColor:'#c0392b',
        fontFamily:'Times',
        righticon:'',
      },
      {
        title: 'Member Since',
        subtitle:this.state.membershipStarted,
        icon: 'edit',
        iconColor:'#c0392b',
        fontFamily:'Times',
        righticon:'',
      },
      {
        title: 'Monthly Payment',
        subtitle:"$"+this.state.monthlyCharge,
        icon: 'lock',
        iconColor:'#c0392b',
        fontFamily:'Oswald-bold',
        righticon:'',
      },
      {
        title: 'Monthly Payment Date',
        subtitle:this.state.paymentDate,
        icon: 'group',
        iconColor:'#c0392b',
        fontFamily:'Oswald-bold',
        righticon:'',
      },
      {
        title: 'Payment Details',
        subtitle:this.state.paymentDetails,
        icon: 'group',
        iconColor:'#c0392b',
        fontFamily:'Oswald-bold',
        righticon:'',
      },
      {
        title: 'Payment History',
        subtitle:"View Details",
        icon: 'group',
        iconColor:'#c0392b',
        fontFamily:'Oswald-bold',
        righticon:'chevron-right',
        buttonAction:paymentHistory,
      },
    ]
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.welcome}>
            Your Account
          </Text>

          <View style={{paddingBottom:15}}>
            <List>
              {
                list.map((item, i) => (
                  <ListItem
                    key={i}
                    titleStyle={titleStyle}
                    onPress={item.buttonAction}
                    title={item.title}
                    subtitle={item.subtitle}
                    subtitleStyle={subtitleStyle}
                    rightIcon={item.righticon}
                    fontFamily="oswald-regular"
                  />
                ))
              }
            </List>
          </View>

          <View style={{paddingBottom:15,paddingTop:15}}>
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
        </ScrollView>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:Platform.OS === 'ios'? 64 : 54,
    backgroundColor: '#e1e8ef',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    paddingTop:20,
    paddingBottom:15,
    fontFamily:'oswald-bold',
    color:"black",
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
