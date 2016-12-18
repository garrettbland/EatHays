import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import {
  Text,
  View,
  WebView,
  Platform,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = { loading:true };
  }

  render() {
    return (
      <View style={{flex: 1,paddingTop:Platform.OS === 'ios'? 64 : 54,backgroundColor:'#e1e8ef'}}>
        {this.state.loading &&
          <View style={{alignItems:'center',justifyContent:'center',height:screenHeight,width:screenWidth}}>
            <ActivityIndicator
              size="large"
              color="#3498db"
            />
          </View>
        }
        <WebView
          style={{backgroundColor:'#e1e8ef'}}
          onLoad={()=>this.setState({loading:false})}
          source={{uri: "http://eathays.com/contact"}}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
