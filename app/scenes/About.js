import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import { Actions } from 'react-native-router-flux';
import {Button, SocialIcon, Icon} from 'react-native-elements';
import {
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
      <View style={{flex: 1,paddingTop:Platform.OS === 'ios'? 64 : 54,backgroundColor: '#e1e8ef'}}>
        <ScrollView>
          <View>
            <Text style={{fontSize: 30,textAlign: 'center',margin: 10,paddingTop:20,paddingBottom:15,fontFamily:'oswald-bold',color:"black"}}>
              Our Mission
            </Text>
          </View>
          <View style={{marginTop:10}}>
            <Text style={{padding:10}}>
              We wanted to build a sweet app that would have it all. Daily deals, phone numbers, images, reviews, hours, and more.
              Being Hays locals, we wanted to create something special for our awesome home and showcase these local places. So,
              we created Eat Hays, a central place for everything eating in Hays, Kansas. We really hope you enjoy the app and we hope it brings usefullness to you!
            </Text>
            <Text style={{padding:10, fontStyle:'italic', color:'#c0392b', fontFamily:'oswald-bold'}}>
              - Garrett Bland | Owner & Developer
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
                <Icon
                  reverse
                  raised
                  name='facebook'
                  type='font-awesome'
                  color='#3b5998'
                  onPress={()=>Actions.SocialWebView({website:"http://facebook.com/EatHays"})}
                />
                <Text style={{fontFamily:"oswald-regular",color:'#7f8c8d'}}>@EatHays</Text>
              </View>
              <View style={{margin:5}}>
                <Icon
                  reverse
                  raised
                  name='twitter'
                  type='font-awesome'
                  color='#00aced'
                  onPress={()=>Actions.SocialWebView({website:"http://twitter.com/Eat_Hays"})}
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

          <View style={{flexDirection:'row',marginBottom:14,marginTop:14,padding:10}}>
            <View style={{width:screenWidth/3,alignItems:'center'}}>
              <Icon
                reverse
                raised
                name='wrench'
                type='font-awesome'
                color='#e67e22'
                onPress={() => Actions.IncorrectDataReport()}
              />
              <Text style={{fontFamily:"oswald-regular",color:'#7f8c8d'}}>
                Report Incorrect Info
              </Text>
            </View>
          </View>

          <Text style={{fontSize: 14,textAlign: 'center',paddingBottom:5,paddingTop:15,fontFamily:'oswald-regular',color:"#7f8c8d"}}>
            EatHays.com
          </Text>

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
