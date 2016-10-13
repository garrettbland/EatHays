import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {Button} from 'react-native-elements';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class SpecialDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading:true
    };
  }

  render() {
    return (
      <View style={styles.container}>
      <ParallaxScrollView
           fadeOutForeground={false}
           renderBackground={() => <Image source={{ uri: this.props.background, width: window.width, height: screenHeight / 2 }}/>}
           contentBackgroundColor="#ffffff"
           parallaxHeaderHeight={screenHeight / 2}
           renderForeground={() => (
            <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
               <Image source={{ uri: this.props.profile, width: screenWidth / 4, height: 100 }}/>
             </View>
           )}>
           <View>
              <Text style={styles.welcomeDay}>{this.props.title} {this.props.day} Special</Text>
              <Text style={styles.description}>{this.props.specialDescription}</Text>
              <Button
                raised
                iconRight
                borderRadius={5}
                icon={{name: 'chevron-right'}}
                fontFamily="oswald-bold"
                fontSize={18}
                buttonStyle={{marginBottom:5,}}
                backgroundColor="#2bc064"
                title='View Restaurant'
                onPress={() => Actions.DirectoryDetail({title:this.props.title})}
              />
           </View>
         </ParallaxScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop:Platform.OS === 'ios'? 64 : 54,
    backgroundColor:'#ffffff',
    flex:1,
  },
  center: {
    alignItems: 'center',
  },
  activityStyle:{
    paddingTop:12,
  },
  welcomeDay: {
    textAlign: 'center',
    backgroundColor:"#c0392b",
    color:'white',
    fontFamily:'oswald-regular',
    fontSize:18,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  description:{
    fontSize:screenWidth / 11,
    fontFamily:'oswald-regular',
    color:'#c0392b',
    textAlign:'center',
    padding:5,
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialDetail);
