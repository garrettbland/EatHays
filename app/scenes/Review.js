import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';
import {
  Text,
  View,
  Platform,
} from 'react-native';

class Review extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount(){
    Actions.refresh({key: 'drawer', open: value => !value});
  }

  render() {
    return (
      <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor: '#FFFFFF'}}>
        <Icon name="check-circle" style={{fontSize:50, color:"#c0392b"}}></Icon>
        <Text style={{fontSize: 12,textAlign: 'center',margin: 10}}>
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

function mapStateToProps(state){
  return {
    user:state.userReducers.user,
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);
