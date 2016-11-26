import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import {Button} from 'react-native-elements';
import {
  Text,
  View,
  WebView,
  Platform,
  ActivityIndicator,
} from 'react-native';

class MapDetail extends Component {

  constructor(props) {
    super(props);
    this.state = { loading:true };
  }

  render() {
    return (
      <View style={{flex: 1,paddingTop:Platform.OS === 'ios'? 64 : 54}}>
        {this.state.loading &&
          <ActivityIndicator
            size="large"
            color="#3498db"
            style={{paddingTop:4}}
          />
        }
        <WebView
          onLoad={()=>this.setState({loading:false})}
          source={{uri: this.props.addressURL}}
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

export default connect(mapStateToProps, mapDispatchToProps)(MapDetail);
