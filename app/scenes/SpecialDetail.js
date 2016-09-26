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
        <ScrollView>
          <View style={styles.center}>
          {
            this.state.loading &&
              <ActivityIndicator
                size="large"
                color="#3498db"
                style={styles.activityStyle}
              />
          }

            <Image
              onLoadStart={() => this.setState({loading:true})}
              onLoad={() => this.setState({loading:false})}
              style={{width: screenWidth / 2, height: 150, marginTop:5, resizeMode:'contain'}}
              source={{uri: this.props.profile}}
            />

            <Image
              onLoadStart={() => this.setState({loading:true})}
              onLoad={() => this.setState({loading:false})}
              style={{width: screenWidth, height:screenHeight/3,resizeMode:'cover'}}
              source={{uri: this.props.background}}
            />
            <Text style={styles.description}>
              {this.props.specialDescription}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:screenHeight / 12,
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
