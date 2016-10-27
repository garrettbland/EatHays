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

class ReviewFullList extends Component {

  constructor(props) {
     super(props);
     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

       this.state = {
         reviewsDataSource: ds.cloneWithRows(this.props.reviews),
       };


      this.itemsRef = this.getRef().child("directoryStatistics");


   }

   getRef() {
     return firebaseApp.database().ref();
   }


  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        <Text style={styles.welcomeDay}>
          {this.props.restaurantTitle} Reviews
        </Text>
        <ListView
          style={{padding:10}}
          dataSource={this.state.reviewsDataSource}
          renderRow={(data) =>
            <View style={{flexDirection:'row',paddingBottom:17}}>
              <View style={{width:screenWidth/10}}>
                <Icon name="user" style={{fontSize:20, color:"#c0392b"}}></Icon>
              </View>

              <View style={{width:screenWidth /1.2,borderBottomColor:'#bdc3c7',borderBottomWidth:1,}}>
                <Text style={{fontSize:12,color:'black',paddingBottom:2,}}>"{data}"</Text>
              </View>
            </View>
          }
        />
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReviewFullList);
