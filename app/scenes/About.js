import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import {Button, SocialIcon} from 'react-native-elements';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  Dimensions
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const goToContact = () => Actions.Contact();

class About extends Component {

  constructor(props) {
    super(props);
    this.state = { /* initial state */ };
  }

  componentWillMount(){
    Actions.refresh({key: 'drawer', open: value => !value});
  }

  render() {
    return (
      <View style={{flex: 1,paddingTop:Platform.OS === 'ios'? 64 : 54,backgroundColor: '#e1e8ef', paddingBottom:10}}>
        <ScrollView>
          <View>
            <Text style={{fontSize: 30,textAlign: 'center',margin: 10,paddingTop:20,paddingBottom:15,fontFamily:'oswald-bold',color:"black"}}>
              Our Mission
            </Text>
          </View>
          <View style={{marginTop:10}}>
            <Text style={{padding:10}}>
              Eating out has something I have always enjoyed. I have been a waiter, a cook, a host, and wore many other hats in the restaurant
              world. Something that had always bugged me, was wanting to see hours of a certain place or what was on the menu. Google and other apps
              are a phenomenal tool for this, but the data was sometimes incorrect and some local places wouldnt be listed in smaller places like Hays.
              Being a Hays resident, I wanted to create something specific for our growing city. Thus, I created Eat Hays. I really hope you enjoy
              the app and I hope it brings usefullness to you.
            </Text>
            <Text style={{padding:10, fontStyle:'italic', color:'#c0392b'}}>
              -Garrett Bland | Owner & Developer
            </Text>
          </View>

          <View>
            <Text style={{fontSize: 30,textAlign: 'center',margin: 5,paddingTop:20,paddingBottom:5,fontFamily:'oswald-bold',color:"black"}}>
              Follow us
            </Text>
          </View>
          <View style={{marginTop:10,alignItems:'center'}}>
            <View style={{flexDirection:'row'}}>
              <View style={{margin:5}}>
                <SocialIcon
                  type='facebook'
                />
                <Text style={{fontFamily:"oswald-regular",color:'#7f8c8d'}}>@EatHays</Text>
              </View>
              <View style={{margin:5}}>
                <SocialIcon
                  type='twitter'
                />
                <Text style={{fontFamily:"oswald-regular",color:'#7f8c8d'}}>@eat_hays</Text>
              </View>
            </View>
          </View>

          <View>
            <Text style={{fontSize: 30,textAlign: 'center',margin: 5,paddingTop:20,paddingBottom:5,fontFamily:'oswald-bold',color:"black"}}>
              Contact Us
            </Text>
            <View>
              <Button
                raised
                iconRight
                borderRadius={5}
                icon={{name: 'edit'}}
                fontFamily="oswald-bold"
                fontSize={18}
                buttonStyle={{marginBottom:5,}}
                backgroundColor="#3498db"
                title='Send us a message'
                onPress={() => Actions.Contact()}
              />
            </View>
          </View>

        </ScrollView>
      </View>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
