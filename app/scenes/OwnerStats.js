import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import {List, ListItem} from 'react-native-elements';
import firebaseApp from "../components/firebaseconfig.js";
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Text,
  View,
  ListView,
  Platform,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

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

      var totalIOS = items.filter(function (item) {
        return item.platform == "ios";
      })
      var totalANDROID = items.filter(function (item) {
        return item.platform == "android";
      })

      var totalDirectoryCount = Object.keys(items).length;
      var totalIOSCount = Object.keys(totalIOS).length;
      var totalAndroidCount = Object.keys(totalANDROID).length;

      var totalDirectoryCountString = totalDirectoryCount.toString();
      var totalIOSCountString = totalIOSCount.toString();
      var totalANDROIDCountString = totalAndroidCount.toString();

      var percentageIOS = (totalIOSCountString / totalDirectoryCountString) * 100;
      var percentageANDROID = (totalANDROIDCountString / totalDirectoryCountString) * 100;

      this.setState({
        totalDirectoryCount:totalDirectoryCountString,
        totalIOSDirectoryCount:totalIOSCountString,
        totalANDROIDDirectoryCount:totalANDROIDCountString,
        percentageIOSDirectory:percentageIOS.toFixed(2),
        percentageANDROIDDirectory:percentageANDROID.toFixed(2),
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

      var totalIOS = items.filter(function (item) {
        return item.platform == "ios";
      })
      var totalANDROID = items.filter(function (item) {
        return item.platform == "android";
      })

      var totalSpecialsCount = Object.keys(items).length;
      var totalIOSCount = Object.keys(totalIOS).length;
      var totalAndroidCount = Object.keys(totalANDROID).length;

      var totalSpecialsCountString = totalSpecialsCount.toString();
      var totalIOSCountString = totalIOSCount.toString();
      var totalANDROIDCountString = totalAndroidCount.toString();

      var percentageIOS = (totalIOSCountString / totalSpecialsCountString) * 100;
      var percentageANDROID = (totalANDROIDCountString / totalSpecialsCountString) * 100;

      this.setState({
        totalSpecialsCount:totalSpecialsCountString,
        totalIOSSpecialsCount:totalIOSCountString,
        totalANDROIDSpecialsCount:totalANDROIDCountString,
        percentageIOSSpecials:percentageIOS.toFixed(2),
        percentageANDROIDSpecials:percentageANDROID.toFixed(2),
      })
    });
  }

  render() {
    return (
      <View style={{flex:1,paddingTop:Platform.OS === 'ios'? 64 : 54,backgroundColor:'#e1e8ef'}}>
        <ScrollView>
          <View style={{paddingBottom:15,margin: 10}}>
            <Text style={{fontSize: 40,textAlign: 'center',paddingTop:20,fontFamily:'oswald-bold',color:"black"}}>
              Statistics
            </Text>
            <Text style={{textAlign: 'center',fontFamily:'oswald-regular',color:'#95a5a6'}}>
              Stats reset on the 1st of each month
            </Text>
          </View>
          <View style={{flexDirection:'column'}}>

            <View style={{flexDirection:'row'}}>
              <View style={{width:screenWidth,height:screenHeight/8}}>
                <View style={{alignItems:'center',justifyContent:'center'}}>
                  <Text style={{textAlign: 'center',fontFamily:'oswald-regular'}}>
                    Total Restaurant Views
                  </Text>
                  <Text style={{textAlign:'center',fontSize:24,color:'#c0392b',fontFamily:'oswald-bold'}}>
                    {this.state.totalDirectoryCount}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{flexDirection:'row'}}>
              <View style={{width:screenWidth/2,height:screenHeight/8}}>
                <Icon name="apple" style={{fontSize:25, color:"#007AFF",textAlign: 'center'}}/>
                <Text style={{textAlign: 'center',fontFamily:'oswald-regular'}}>
                  by iOS
                </Text>
                <Text style={{textAlign:'center',fontSize:18,color:'#c0392b',fontFamily:'oswald-regular'}}>
                  {this.state.totalIOSDirectoryCount} ({this.state.percentageIOSDirectory}%)
                </Text>
              </View>
              <View style={{width:screenWidth/2,height:screenHeight/8}}>
                <Icon name="android" style={{fontSize:25, color:"#2ecc71", textAlign:'center'}}/>
                <Text style={{textAlign: 'center',fontFamily:'oswald-regular'}}>
                  by Android
                </Text>
                <Text style={{textAlign:'center',fontSize:18,color:'#c0392b',fontFamily:'oswald-regular'}}>
                  {this.state.totalANDROIDDirectoryCount} ({this.state.percentageANDROIDDirectory}%)
                </Text>
              </View>
            </View>

            <View style={{width:screenWidth,marginBottom:25,marginTop:25,alignItems:'center'}}>
              <View style={{width:screenWidth - 50,backgroundColor:'#95a5a6',height:1,alignItems:'center'}}>
              </View>
            </View>

            <View style={{flexDirection:'row'}}>
              <View style={{width:screenWidth,height:screenHeight/8}}>
                <Text style={{textAlign: 'center',fontFamily:'oswald-regular'}}>
                  Total Deals of the Day Views
                </Text>
                <Text style={{textAlign:'center',fontSize:24,color:'#c0392b',fontFamily:'oswald-bold'}}>
                  {this.state.totalSpecialsCount}
                </Text>
              </View>
            </View>

              <View style={{flexDirection:'row'}}>
                <View style={{width:screenWidth/2,height:screenHeight/8}}>
                  <Icon name="apple" style={{fontSize:25, color:"#007AFF",textAlign: 'center'}}/>
                  <Text style={{textAlign: 'center',fontFamily:'oswald-regular'}}>
                    by iOS
                  </Text>
                  <Text style={{textAlign:'center',fontSize:18,color:'#c0392b',fontFamily:'oswald-regular'}}>
                    {this.state.totalIOSSpecialsCount} ({this.state.percentageIOSSpecials}%)
                  </Text>
                </View>
                <View style={{width:screenWidth/2,height:screenHeight/8}}>
                  <Icon name="android" style={{fontSize:25, color:"#2ecc71", textAlign:'center'}}/>
                  <Text style={{textAlign: 'center',fontFamily:'oswald-regular'}}>
                    by Android
                  </Text>
                  <Text style={{textAlign:'center',fontSize:18,color:'#c0392b',fontFamily:'oswald-regular'}}>
                    {this.state.totalANDROIDSpecialsCount} ({this.state.percentageANDROIDSpecials}%)
                  </Text>
                </View>
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
