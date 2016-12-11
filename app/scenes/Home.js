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
import {
  Text,
  View,
  TouchableOpacity,
  ListView,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const today = moment().isoWeekday();
const todayFormatted = moment().format('dddd');

class Home extends Component {

  componentWillMount(){
    Actions.refresh({key: 'drawer', open: false});
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
  }

  getRef() {
    return firebaseApp.database().ref();
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

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  render() {
    return (
      <View style={{flex: 1,paddingTop:Platform.OS === 'ios'? 64 : 54,backgroundColor:'#e1e8ef'}}>
        <ScrollView>
          <View>
            <View style={{margin: 10,marginTop:20,paddingBottom:20}}>
              <Image source={require('../images/DealsoftheDay.png')} resizeMode='contain' style={{width: screenWidth, height: screenHeight/5}}/>
            </View>
          </View>
          <View>
            <Text style={{textAlign: 'center',backgroundColor:"#c0392b",color:'white',fontFamily:'oswald-regular',fontSize:27}}>
              {todayFormatted} Specials
            </Text>
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
            <Card image={{uri: item.today.image}}>
              <View style={{flexDirection:'row'}}>
                <View style={{alignItems:'flex-start', flex:4, justifyContent:'center'}}>
                  <Text style={{fontFamily:'oswald-bold',fontSize:screenWidth/18,color:'#000000'}}>{newSpecialString}</Text>
                </View>
                <View style={{alignItems:'flex-end', flex:2}}>
                  <Image
                    onLoadStart={() => this.setState({loading:true})}
                    onLoad={() => this.setState({loading:false})}
                    style={{height:75, width:125}}
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
                  borderRadius={0}
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
