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
  Platform,
} from 'react-native';

class Review extends Component {

  constructor(props) {
    super(props);
    this.state = { /* initial state */ };
  }

  componentWillMount(){
    Actions.refresh({key: 'drawer', open: value => !value});
  }

  render() {
    return (
      <View style={styles.container}>
      <Icon name="comments" style={{fontSize:50, color:"#2ecc71"}}></Icon>
        <Text style={styles.disclaimer}>
          All data and information provided will be reviewed before published. We reserve the right to right to remove any reviews.
          We encourage you to write a constructive review about the food, service, price, ect. Thank you!
        </Text>
        <Button
          raised
          borderRadius={5}
          icon={{name: 'edit'}}
          title='Write Review'
          backgroundColor="#3498db"
          onPress={() => Actions.ReviewDetail()}
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
    backgroundColor: '#FFFFFF',
  },
  disclaimer: {
    fontSize: 12,
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

export default connect(mapStateToProps, mapDispatchToProps)(Review);
