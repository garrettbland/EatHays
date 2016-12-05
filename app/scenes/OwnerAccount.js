import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import { Actions } from 'react-native-router-flux';
import {Button, List, ListItem} from 'react-native-elements';
import firebaseApp from "../components/firebaseconfig.js";
import {
  Text,
  View,
  Alert,
  AsyncStorage,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class OwnerAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      membershipStarted:'Loading...',
      monthlyCharge:'Loading...',
      ownerEmail:'Loading...',
      ownerRestaurant:'Loading...',
      paymentDate:'Loading...',
      paymentDetails: 'Loading...',
      paymentHistory: 'Loading...',
    };
  }

  componentWillMount(){
    AsyncStorage.getItem("owneremail").then((value) => {
      this.setState({"owneremail": value});
    }).then(res => {
      this.getServerInfo()
    });
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
          active: child.val().active,
          membershipStarted: child.val().membershipStarted,
          monthlyCharge: child.val().monthlyCharge,
          ownerEmail: child.val().ownerEmail,
          ownerRestaurant: child.val().ownerRestaurant,
          paymentDate: child.val().paymentDate,
          paymentDetails: child.val().paymentDetails,
          paymentHistory: child.val().paymentHistory,
          supportEmail: child.val().supportEmail,
          supportRep: child.val().supportRep,
          supportPhone: child.val().supportPhone,
          _key: child.key,
        });
      });

      this.setState({
        active: items[0].active,
        membershipStarted: items[0].membershipStarted,
        monthlyCharge: items[0].monthlyCharge,
        ownerEmail: items[0].ownerEmail,
        ownerRestaurant: items[0].ownerRestaurant,
        paymentDate: items[0].paymentDate,
        paymentDetails: items[0].paymentDetails,
        paymentHistory: items[0].paymentHistory,
        supportEmail: items[0].supportEmail,
        supportRep: items[0].supportRep,
        supportPhone: items[0].supportPhone,
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
    if(this.state.active === false){
      return (
        <View style={{flex: 1,paddingTop:Platform.OS === 'ios'? 64 : 54,backgroundColor: '#e1e8ef'}}>
          <ScrollView>
            <View>
              <Text style={{fontSize: 40,textAlign: 'center',margin: 10,paddingTop:20,paddingBottom:15,fontFamily:'oswald-bold',color:"black"}}>
                Your Account
              </Text>
            </View>
            <View>
              <Text style={{margin:10,}}>
                Your Account has been disabled. Please contact your support representative if this is an error.
              </Text>
            </View>
            <View style={{flex:1,flexDirection:'row',marginLeft:10,paddingTop:15}}>
              <View style={{width:screenWidth/2}}>
                <Text stlye={{color:'#7f8c8d'}}>Support Representative</Text>
                <Text stlye={{color:'#7f8c8d'}}>Support Phone & Text</Text>
                <Text stlye={{color:'#7f8c8d'}}>Support Email</Text>
              </View>
              <View style={{width:screenWidth/2}}>
                <Text style={{fontWeight:'bold',color:'#7f8c8d'}}>{this.state.supportRep}</Text>
                <Text style={{fontWeight:'bold',color:'#7f8c8d'}}>{this.state.supportPhone}</Text>
                <Text style={{fontWeight:'bold',color:'#7f8c8d'}}>{this.state.supportEmail}</Text>
              </View>
            </View>
            <View style={{paddingBottom:15,paddingTop:35}}>
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
    }else{
      const titleStyle = {color:"#c0392b", fontFamily:'oswald-regular', fontSize:18};
      const subtitleStyle = {color:'#95a5a6', fontFamily:'oswald-regular', fontSize:13};
      const paymentHistory = () => Actions.OwnerPaymentHistory({paymentHistory:this.state.paymentHistory})
      const paymentDetails = () => Actions.OwnerPaymentDetails({monthlyCharge:this.state.monthlyCharge,paymentDate:this.state.paymentDate,paymentDetails:this.state.paymentDetails})
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
          title: 'Payment Details',
          subtitle:"View Details",
          icon: 'group',
          iconColor:'#c0392b',
          fontFamily:'Oswald-bold',
          righticon:'chevron-right',
          buttonAction:paymentDetails,
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
        <View style={{flex: 1,paddingTop:Platform.OS === 'ios'? 64 : 54,backgroundColor: '#e1e8ef'}}>
          <ScrollView>
            <View>
              <Text style={{fontSize: 40,textAlign: 'center',margin: 10,paddingTop:20,paddingBottom:15,fontFamily:'oswald-bold',color:"black"}}>
                Your Account
              </Text>
            </View>
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
            <View style={{flex:1,flexDirection:'row',marginLeft:15,paddingTop:15}}>
              <View style={{width:screenWidth/2}}>
                <Text stlye={{color:'#7f8c8d'}}>Support Representative</Text>
                <Text stlye={{color:'#7f8c8d'}}>Support Phone & Text</Text>
                <Text stlye={{color:'#7f8c8d'}}>Support Email</Text>
              </View>
              <View style={{width:screenWidth/2}}>
                <Text style={{fontWeight:'bold',color:'#7f8c8d'}}>{this.state.supportRep}</Text>
                <Text style={{fontWeight:'bold',color:'#7f8c8d'}}>{this.state.supportPhone}</Text>
                <Text style={{fontWeight:'bold',color:'#7f8c8d'}}>{this.state.supportEmail}</Text>
              </View>
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
}

function mapStateToProps(state){
  return {
    user:state.userReducers.user,
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnerAccount);
