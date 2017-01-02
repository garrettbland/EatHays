import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import { Actions } from 'react-native-router-flux';
import firebaseApp from "../components/firebaseconfig.js";
import moment from 'moment';
import Image from 'react-native-image-progress';
import { Card, Button } from 'react-native-elements';
import shuffle from 'shuffle-array';
import SplashScreen from "rn-splash-screen";
import Emoji from 'react-native-emoji';
import {
  Text,
  View,
  TouchableOpacity,
  ListView,
  Dimensions,
  ScrollView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const today = moment().isoWeekday();
const todayFormatted = moment().format('dddd');

class Home extends Component {

  componentWillMount(){
    Actions.refresh({key: 'drawer', open: false});
    // Hide the active splash screen
    Platform.OS === 'ios'? null : SplashScreen.hide();
  }

  constructor(props) {
    super(props);
    this.state = {
      loading:true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef().child('specials');
    this.systemRef = this.getRef().child('alerts');
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
    this.listenForSystem(this.systemRef);
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      var items = [];
      snap.forEach((child) => {
        items.push({
          active: child.val().active,
          title: child.val().title,
          today: child.val()[todayFormatted],
          profile: child.val().profile,
          _key: child.key,
        });
      });
      var shuffleData = shuffle(items);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(shuffleData)
      });
    });
  }

  listenForSystem(systemRef) {
    systemRef.on('value', (snap) => {
      var items = [];
      snap.forEach((child) => {
        items.push({
          active:child.val().active,
          message: child.val().systemMessage,
          systemMessageTitle: child.val().systemMessageTitle,
          systemEmoji: child.val().systemEmoji,
          systemColor: child.val().systemColor,
        });
      });
      var serverMessage = items[0].message;
      var serverMessageActive = items[0].active;
      var serverMessageTitle = items[0].systemMessageTitle;
      var serverEmoji = items[0].systemEmoji;
      var serverColor = items[0].systemColor;
      this.setState({
        systemMessageActive:serverMessageActive,
        systemMessage:serverMessage,
        systemMessageTitle:serverMessageTitle,
        systemEmoji:serverEmoji,
        systemColor:serverColor,
      });
    });
  }

  render() {
    var systemColor = this.state.systemColor;
    return (
      <View style={{flex: 1,paddingTop:Platform.OS === 'ios'? 64 : 54,backgroundColor:'#e1e8ef'}}>
        <ScrollView>
          <View>
            {this.state.systemMessageActive &&
              <Card containerStyle={{borderRadius:10,borderWidth:0,backgroundColor:systemColor}}>
                <View>
                  <View style={{alignItems:'flex-start', justifyContent:'center'}}>
                    <Text style={{fontFamily:'oswald-bold',fontSize:screenWidth/18,color:'#ffffff'}}>{this.state.systemMessageTitle}<Emoji style={{fontSize:40}} name={this.state.systemEmoji}/></Text>
                  </View>
                  <Text style={{marginBottom: 10,paddingTop:15,color:'#ffffff',fontFamily:'oswald-regular'}}>
                    {this.state.systemMessage}
                  </Text>
                </View>
              </Card>
            }
            <View style={{margin: 10,marginTop:20,paddingBottom:20}}>
              <Image source={require('../images/DealsoftheDay.png')} resizeMode='contain' style={{width: screenWidth, height: screenHeight/5}}/>
            </View>
          </View>
          <View>
            <Text style={{textAlign: 'center',backgroundColor:"#c0392b",color:'white',fontFamily:'oswald-regular',fontSize:27}}>
              {todayFormatted} Specials
            </Text>
          </View>
          <View style={{marginTop:7,marginBottom:7}}>
            {this.state.loading &&
              <ActivityIndicator
                size="large"
                color="#3498db"
              />
            }
          </View>
          <View style={{paddingBottom:15}}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this._renderItem.bind(this)}
              enableEmptySections={true}
              scrollRenderAheadDistance={20}
              initialListSize={5}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  _renderItem(item) {
    if(item.active === false){
      return (<View></View>);
    }else if(item.today.active === false){
      return (<View></View>);
    }else{
      var descriptonString = item.today.description;
      var specialString = item.today.special;

      if (descriptonString.length > 93){
        var newDescriptionString = descriptonString.substring(0,93-3)+"..."
      }else{
        var newDescriptionString = descriptonString;
      }

      if (specialString.length > 50){
        var newSpecialString = specialString.substring(0,50-3)+"..."
      }else{
        var newSpecialString = specialString;
      }

      return (
        <View style={{backgroundColor:'#e1e8ef'}}>
          <TouchableOpacity onPress={() => Actions.SpecialDetail({title:item.title,profile:item.profile,background:item.today.image,special:item.today.special,specialDescription:item.today.description,day:todayFormatted})}>
            <Card image={{uri: item.today.image}} imageStyle={{borderTopLeftRadius:10,borderTopRightRadius:10}} containerStyle={{borderWidth:1,borderColor:'#e1e8ef',shadowRadius: 0,shadowColor: '#ffffff',overflow: 'hidden',borderRadius:10}}>
              <View style={{flexDirection:'row'}}>
                <View style={{alignItems:'flex-start', flex:4, justifyContent:'center'}}>
                  <Text style={{fontFamily:'oswald-bold',fontSize:screenWidth/18,color:'#000000'}}>{newSpecialString}</Text>
                </View>
                <View style={{alignItems:'flex-end', flex:2}}>
                  <Image
                    onLoad={() => this.setState({loading:false})}
                    style={{height:75, width:125,}}
                    source={{uri: item.profile}}
                    resizeMode={'contain'}
                  />
                </View>
              </View>
              <View>
                <Text style={{marginBottom: 10,paddingTop:15}}>
                  {newDescriptionString}
                </Text>
              </View>
              <View>
                <Button
                  small
                  borderRadius={10}
                  icon={{name: 'star'}}
                  backgroundColor='#2bc064'
                  fontFamily='oswald-regular'
                  buttonStyle={{marginLeft: 0, marginRight: 0, marginBottom: 0}}
                  title={'VIEW DETAILS'}
                  onPress={() => Actions.SpecialDetail({title:item.title,profile:item.profile,background:item.today.image,special:item.today.special,specialDescription:item.today.description,day:todayFormatted})}
                />
              </View>
            </Card>
          </TouchableOpacity>
        </View>
      );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
