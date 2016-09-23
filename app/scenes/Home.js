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
  Dimensions,
  ActivityIndicator,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const today = moment().isoWeekday();
var todayFormat = moment(today).format("dddd");
class Home extends Component {

  componentWillMount(){
    Actions.refresh({key: 'drawer', open: false});
    console.log(todayFormat);
  }

  constructor(props) {
    super(props);
    this.state = {
      loading:true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef().child('placesToEat');
  }

  getRef() {
    return firebaseApp.database().ref();
  }


  listenForItems(itemsRef) {

    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          profile:child.val().profile,
          test:child.val().test,
          special:child.val().Wednesday,
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
      <Icon name="star" style={{fontSize:50,color:"#f1c40f"}}></Icon>
        <Text style={styles.welcome}>
          Deals of the Day
        </Text>
        {
          this.state.loading &&

          <ActivityIndicator
            size="large"
            color="#3498db"
          />

        }
        <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderItem.bind(this)}
            enableEmptySections={true}
        />
      </View>
    );
  }

  _renderItem(item) {

  return (
    <View>
      <Image
        onLoadStart={() => this.setState({loading:true})}
        onLoadEnd={() => this.setState({loading:false})}
        style={{width: screenWidth, height: 150}}
        source={{uri: item.profile}}
      >
        <View style={{flex:1,flexDirection:'column', justifyContent:'center'}}>
          <Image style={{width:70,height:70, marginLeft:8, }} source={{uri: item.test}}></Image>
          {
            item.special.length > 10 &&
            <Text style={{letterSpacing:1,backgroundColor:'rgba(0, 0, 0, 0.44)',color:'white',fontSize:screenWidth/12,fontFamily:'oswald-bold',}}>{item.special}</Text>
          }
          {
            item.special.length <= 10 &&
            <Text style={{letterSpacing:1,backgroundColor:'rgba(0, 0, 0, 0.44)',color:'white',fontSize:screenWidth/8,fontFamily:'oswald-bold',}}>{item.special}</Text>
          }

        </View>
      </Image>
    </View>
  );
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
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
