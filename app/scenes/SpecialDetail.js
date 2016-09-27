import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ActivityIndicator,
  Dimensions,
  ScrollView,
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
           renderBackground={() => <Image source={{ uri: this.props.background, width: window.width, height: screenHeight / 2 }}/>}
           contentBackgroundColor="#c0392b"
           parallaxHeaderHeight={screenHeight / 2}
           renderForeground={() => (
            <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
               <Image source={{ uri: this.props.profile, width: screenWidth / 4, height: 100 }}/>
             </View>
           )}>
           <View style={{flex:1}}>
             <Text style={styles.description}>{this.props.specialDescription}</Text>
           </View>
         </ParallaxScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop:screenHeight / 12,
    backgroundColor:'#c0392b',
    flex:1,
  },
  center: {
    alignItems: 'center',
  },
  activityStyle:{
    paddingTop:12,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  description:{
    fontSize:screenWidth / 11,
    fontFamily:'oswald-regular',
    color:'#FFFFFF',
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
