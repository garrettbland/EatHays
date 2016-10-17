import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import {Button} from 'react-native-elements';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
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
      <View style={styles.container}>
      { this.state.loading &&
        <ActivityIndicator
          size="large"
          color="#3498db"
          style={{paddingTop:4}}
        />
      }
      <WebView
        onLoad={()=>this.setState({loading:false})}
        source={{uri: this.props.addressURL}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:Platform.OS === 'ios'? 64 : 54,
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

export default connect(mapStateToProps, mapDispatchToProps)(MapDetail);
