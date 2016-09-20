import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';


class Directory extends Component {

  constructor(props) {
    super(props);
    this.state = {loading:false};
  }

  componentWillMount(){
    Actions.refresh({key: 'drawer', open: value => !value});
  }

  render() {
    return (
      <View style={styles.container}>
      <Icon name="sitemap" style={{fontSize:50,color:"#8e44ad"}}></Icon>
        <Text style={styles.welcome}>
          Directory
        </Text>
        {
          this.state.loading &&
          <ActivityIndicator
            size="large"
            color="#3498db"
          />
        }
          <Image
            onLoadStart={() => this.setState({loading:true})}
            onLoadEnd={() => this.setState({loading:false})}
            style={{width: 100, height: 100}}
            source={{uri: 'https://firebasestorage.googleapis.com/v0/b/eat-hays.appspot.com/o/places-to-eat%2Fgellas%2Findex2.jpg?alt=media&token=47384d8d-8268-49ef-b5f9-53e744f2d4cd'}}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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

export default connect(mapStateToProps, mapDispatchToProps)(Directory);
