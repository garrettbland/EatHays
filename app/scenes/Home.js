import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import firebaseApp from "../components/firebaseconfig.js";
import moment from 'moment';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ListView,
  Image,
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
        {
          this.state.loading &&

          <ActivityIndicator
            size="large"
            color="#3498db"
            style={styles.activityStyle}
          />

        }
        <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderItem.bind(this)}
            enableEmptySections={true}
        />
        </ScrollView>
      </View>
    );
  }

  _renderItem(item) {
          return (
            <View style={styles.listContainter}>
              <TouchableOpacity onPress={() => Actions.SpecialDetail({title:item.title,profile:item.profile,background:item.background,special:item.special,specialDescription:item.specialDescription,day:todayFormatted})}>
                <Image
                  onLoadStart={() => this.setState({loading:true})}
                  onLoad={() => this.setState({loading:false})}
                  style={styles.listImage}
                  source={{uri: item.background}}
                >
                  <View style={{flex:1,flexDirection:'column', justifyContent:'center'}}>
                    <Image style={{width:70,height:70, marginLeft:8, }} source={{uri: item.profile}} ></Image>
                    {
                      item.special.length > 10 &&
                      <Text style={{letterSpacing:1,backgroundColor:'rgba(0, 0, 0, 0.44)',color:'white',fontSize:screenWidth/12,fontFamily:'oswald-bold', paddingLeft:8}}>{item.special}</Text>
                    }
                    {
                      item.special.length <= 10 &&
                      <Text style={{letterSpacing:1,backgroundColor:'rgba(0, 0, 0, 0.44)',color:'white',fontSize:screenWidth/8,fontFamily:'oswald-bold', paddingLeft:8}}>{item.special}</Text>
                    }

                  </View>
                </Image>
              </TouchableOpacity>
            </View>
          );
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:Platform.OS === 'ios'? 64 : 54,
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    fontFamily:'oswald-bold',
    color:"black",
  },
  welcomeDay: {
    textAlign: 'center',
    backgroundColor:"#c0392b",
    color:'white',
    fontFamily:'oswald-regular',
    fontSize:18,
  },
  listContainter: {
    backgroundColor:"#c0392b",
  },
  listImage:{
    width: screenWidth,
    height: 150,
    marginBottom:2,
  },
  activityStyle:{
    marginTop:5,
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
