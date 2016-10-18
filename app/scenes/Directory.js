import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import firebaseApp from "../components/firebaseconfig.js";
import moment from 'moment';
import { SearchBar } from 'react-native-elements';

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

class Directory extends Component {

  componentWillMount(){
    Actions.refresh({key: 'drawer', open: false});
  }

  constructor(props) {
    super(props);
    this.state = {
      loading:true,
      searchText:"",
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef().child('directory');
  }

  getRef() {
    return firebaseApp.database().ref();
  }


  listenForItems(itemsRef) {

    itemsRef.on('value', (snap) => {

      var items = [];
      snap.forEach((child) => {
        items.push({
          address: child.val().address,
          addressURL: child.val().addressURL,
          background:child.val().background,
          category: child.val().category,
          description: child.val().description,
          hours: child.val().hours,
          images: child.val().images,
          mapImage: child.val().mapImage,
          menu: child.val().menu,
          parking: child.val().parking,
          phone: child.val().phone,
          profile: child.val().profile,
          reviews: child.val().reviews,
          title: child.val().title,
          visits: child.val().visits,
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

  firstSearch(text) {
    this.searchDirectory(this.itemsRef);
    this.setState({
      searchText:text
    })
  }

  searchDirectory(itemsRef) {

    var searchText = this.state.searchText.toString();
    if (searchText == ""){
      this.listenForItems(itemsRef);
    }else{
      itemsRef.orderByChild("title").startAt(searchText).endAt(searchText).on('value', (snap) => {

        items = [];
        snap.forEach((child) => {
          items.push({
            address: child.val().address,
            addressURL: child.val().addressURL,
            background:child.val().background,
            category: child.val().category,
            description: child.val().description,
            hours: child.val().hours,
            images: child.val().images,
            mapImage: child.val().mapImage,
            menu: child.val().menu,
            parking: child.val().parking,
            phone: child.val().phone,
            profile: child.val().profile,
            reviews: child.val().reviews,
            title: child.val().title,
            visits: child.val().visits,
            _key: child.key,
          });
        });


        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(items)
        });

      });
    }

  }

  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
      <SearchBar
          returnKeyType='search'
          lightTheme
          placeholder='Search...'
          onChangeText={(text) => this.firstSearch(text)}
          onSubmitEditing={() => this.firstSearch()}
      />
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
              <TouchableOpacity onPress={() => Actions.DirectoryDetail({title:item.title,item})}>
                <View style={{marginBottom:2,backgroundColor:'white',flexDirection:'row',paddingLeft:5,}}>
                  <View style={{alignItems:'flex-start',flex:2}}>
                    <Text style={{fontFamily:'oswald-bold',fontSize:20,color:"#000000"}}>{item.title}</Text>
                    <Text>{item.category}</Text>
                    <Text>{item.description}</Text>
                  </View>
                  <View style={{alignItems:'flex-end',flex:2,}}>
                    <Image
                      onLoadStart={() => this.setState({loading:true})}
                      onLoad={() => this.setState({loading:false})}
                      style={styles.listImage}
                      source={{uri: item.background}}
                    >
                    </Image>
                  </View>
                </View>
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
    backgroundColor:"#ffffff",
    flex:1,
  },
  listImage:{
    padding:5,
    width: screenWidth / 3,
    height: screenWidth / 3,
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

export default connect(mapStateToProps, mapDispatchToProps)(Directory);
