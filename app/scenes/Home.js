import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import firebaseApp from "../components/firebaseconfig.js";
import moment from 'moment';
import Image from 'react-native-image-progress';
import { Card, Button } from 'react-native-elements';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ListView,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const today = moment().isoWeekday();
const todayFormatted = moment().format('dddd');
const imageText = "image";

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
          background:child.val()[imageText + today],
          profile:child.val().profile,
          special:child.val()[today],
          specialDescription:child.val()[today + 10],
          _key: child.key,
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        <Text style={styles.welcome}>
          Deals of the Day
        </Text>

        <Text style={styles.welcomeDay}>
          {todayFormatted} Specials
        </Text>

        <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderItem.bind(this)}
            enableEmptySections={true}
            scrollRenderAheadDistance={20}
            initialListSize={5}
        />
        </ScrollView>
      </View>
    );
  }

  _renderItem(item) {

    if(item.active === false){
      return (
        <View></View>
      );
    }else {

    var descriptonString = item.specialDescription;
    if (descriptonString.length > 93){
      var newDescriptionString = descriptonString.substring(0,93-3)+"..."
    }else{
      newDescriptionString = descriptonString
    }

    if (this.state.dataSource.getRowCount() == 0){
      this.setState({loading:false});
      return (
        <View>Check back later for sales</View>
      );
    }else if (item.special == "nospecial" || item.special == "" || !item.special){
        return (
          <View></View>
        );
    }else{
          return (
            <View style={styles.listContainter}>

            <TouchableOpacity onPress={() => Actions.SpecialDetail({title:item.title,profile:item.profile,background:item.background,special:item.special,specialDescription:item.specialDescription,day:todayFormatted})}>
            <Card
              image={{uri: item.background}}
            >

            <View style={{flexDirection:'row'}}>
              <View style={{alignItems:'flex-start', flex:4, justifyContent:'center'}}>
                <Text style={{fontFamily:'oswald-bold',fontSize:screenWidth/18,color:'#000000'}}>{item.special}</Text>
              </View>

              <View style={{alignItems:'flex-end', flex:2}}>
              <Image
                onLoadStart={() => this.setState({loading:true})}
                onLoad={() => this.setState({loading:false})}
                style={{height:75, width:125}}
                source={{uri: item.profile}}
                resizeMode={'contain'}
                indicator={ActivityIndicator}
              />
              </View>
            </View>

              <Text style={{marginBottom: 10}}>
                {newDescriptionString}
              </Text>
              <Button
                small
                borderRadius={0}
                icon={{name: 'star'}}
                backgroundColor='#2bc064'
                fontFamily='oswald-regular'
                buttonStyle={{marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title={'VIEW DETAILS'}
              onPress={() => Actions.SpecialDetail({title:item.title,profile:item.profile,background:item.background,special:item.special,specialDescription:item.specialDescription,day:todayFormatted})}
              />
            </Card>
            </TouchableOpacity>

            </View>
          );
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:Platform.OS === 'ios'? 64 : 54,
    backgroundColor:'#e1e8ef',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    paddingTop:20,
    paddingBottom:15,
    fontFamily:'oswald-bold',
    color:"black",
  },
  welcomeDay: {
    textAlign: 'center',
    backgroundColor:"#c0392b",
    color:'white',
    fontFamily:'oswald-regular',
    fontSize:27,
  },
  listContainter: {
    backgroundColor:"#e1e8ef",
  },
  listImage:{
    width: screenWidth,
    height: 150,
    marginBottom:0,
    backgroundColor:'#e1e8ef',
  },
  activityStyle:{
    paddingBottom:5,
    backgroundColor:'#e1e8ef',
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
