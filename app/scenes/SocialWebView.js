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

class SocialWebView extends Component {
  constructor(props) {
    super(props);
    var website = this.props.website
    this.state = {
      loading:true,
      website:website,
    };
  }

  render() {
    return (
      <View style={{flex: 1,backgroundColor:'#e1e8ef'}}>
        {this.state.loading &&
          <View style={{alignItems:'center',justifyContent:'center',height:screenHeight,width:screenWidth}}>
            <ActivityIndicator
              size="large"
              color="#3498db"
            />
          </View>
        }
        <View style={{flex: 1,paddingTop:Platform.OS === 'ios'? 64 : 54,backgroundColor:'#e1e8ef'}}>
          <WebView
            style={{backgroundColor:'#e1e8ef'}}
            onLoad={()=>this.setState({loading:false})}
            source={{uri: this.state.website}}
          />
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SocialWebView);
