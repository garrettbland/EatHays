import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import {Button, Card} from 'react-native-elements';
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

     var dataSource = this.props.reviews;
     var dataSourceReversed = dataSource.reverse();
       this.state = {
         reviewsDataSource: ds.cloneWithRows(dataSourceReversed),
       };


      this.itemsRef = this.getRef().child("directoryStatistics");


   }

   getRef() {
     return firebaseApp.database().ref();
   }

   _renderItem(item) {
     if (item.review == "null"){
       return (
         <View>
         <Card
            >
            <Text style={{color:'#c0392b',fontFamily:'oswald-regular',fontSize:15,marginBottom:6}}>
            No Reviews yet, be the first!
            </Text>
            <Text style={{fontStyle:'italic',color:'#7f8c8d',fontSize:13}}>No sign up required</Text>
          </Card>
         </View>
       )
     }else{
           return (
             <View >
               <Card
                  >
                  <Text style={{color:'#c0392b',fontFamily:'oswald-regular',fontSize:15,marginBottom:6}}>
                  {item.review}
                  </Text>

                  <Text style={{fontStyle:'italic',color:'#7f8c8d',fontSize:13}}>{item.name} on {item.date}</Text>
                </Card>
             </View>
           );
         }
       }



  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        <Text style={styles.welcomeDay}>
          {this.props.restaurantTitle} Reviews
        </Text>
        <ListView
            dataSource={this.state.reviewsDataSource}
            renderRow={this._renderItem.bind(this)}
            enableEmptySections={true}
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
