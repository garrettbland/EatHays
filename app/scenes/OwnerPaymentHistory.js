import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import {Button} from 'react-native-elements';
import firebaseApp from "../components/firebaseconfig.js";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ListView,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class OwnerPaymentHistory extends Component {

  constructor(props) {
     super(props);
     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

       this.state = {
         paymentHistoryDataSource: ds.cloneWithRows(this.props.paymentHistory),
       };


   }

   getRef() {
     return firebaseApp.database().ref();
   }


  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        <Text style={styles.welcomeDay}>
          Payment History
        </Text>
        <ListView
            dataSource={this.state.paymentHistoryDataSource}
            renderRow={this._renderItem.bind(this)}
            enableEmptySections={true}
        />
        </ScrollView>
      </View>
    );
  }

  _renderItem(item) {

          return (
            <View>
              <Text>
                Amount Paid: {item.amountPaid}
                Date Paid: {item.datePaid}
                Summary: {item.description}
              </Text>
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
  welcomeDay: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    paddingTop:20,
    paddingBottom:15,
    fontFamily:'oswald-bold',
    color:"black",
  }
});

function mapStateToProps(state){
  return {
    user:state.userReducers.user,
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnerPaymentHistory);
