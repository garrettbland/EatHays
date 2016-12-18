import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import {List, ListItem} from 'react-native-elements';
import firebaseApp from "../components/firebaseconfig.js";
import {
  Text,
  View,
  ListView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';

class OwnerStats extends Component {

  constructor(props) {
    super(props);
    this.state = {
      totalDirectoryCount:"Loading...",
      totalSpecialsCount:"Loading..."
    }
  }

  componentWillMount(){
    this.getServerInfo()
  }

  getServerInfo(){
    this.directoryRef = this.getRef().child('directoryStatistics');
    this.listenForDirectory(this.directoryRef);
    this.specialsRef = this.getRef().child('specialsStatistics');
    this.listenForSpecials(this.specialsRef);
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  listenForDirectory(directoryRef) {
    directoryRef.orderByChild("restaurant").startAt(this.props.restaurant).endAt(this.props.restaurant).on('value', (snap) => {
      items = [];
      snap.forEach((child) => {
        items.push({
          platform: child.val().platform,
          timestamp: child.val().timestamp,
          _key: child.key,
        });
      });

      var totalDirectoryCount = Object.keys(items).length;
      var totalDirectoryCountString = totalDirectoryCount.toString()
      this.setState({
        totalDirectoryCount:totalDirectoryCountString
      })
    });
  }

  listenForSpecials(specialsRef) {

    specialsRef.orderByChild("restaurant").startAt(this.props.restaurant).endAt(this.props.restaurant).on('value', (snap) => {
      items = [];
      snap.forEach((child) => {
        items.push({
          platform: child.val().platform,
          timestamp: child.val().timestamp,
          _key: child.key,
        });
      });

      var totalSpecialsCount = Object.keys(items).length;
      var totalSpecialsCountString = totalSpecialsCount.toString()
      this.setState({
        totalSpecialsCount:totalSpecialsCountString
      })
    });
  }

  render() {
    return (
      <View style={{flex:1,paddingTop:Platform.OS === 'ios'? 64 : 54,backgroundColor:'#e1e8ef'}}>
        <ScrollView>
          <View>
            <Text style={{fontSize: 40,textAlign: 'center',margin: 10,paddingTop:20,paddingBottom:15,fontFamily:'oswald-bold',color:"black"}}>
              Statistics
            </Text>
          </View>
          <View style={{flexDirection:'column'}}>
            <View>
              <Text>
                Total Rates
              </Text>
              <Text>
                {this.state.totalDirectoryCount}
              </Text>
            </View>
            <View>
              <Text>
                Specials Stats
              </Text>
              <Text>
                {this.state.totalSpecialsCount}
              </Text>
            </View>
          </View>
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(OwnerStats);
