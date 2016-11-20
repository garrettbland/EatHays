import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import firebaseApp from '../components/firebaseconfig.js';
import moment from 'moment';
import { SearchBar } from 'react-native-elements';
import ModalPicker from 'react-native-modal-picker';
import Image from 'react-native-image-progress';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  ListView,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Platform,
  Modal,
  TextInput,
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
      visible:false,
      searchText:"",
      filterValue:"Filter By Category",
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
          active: child.val().active,
          address: child.val().address,
          addressURL: child.val().addressURL,
          averagePrice: child.val().averagePrice,
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
          searchable: child.val().searchable,
          title: child.val().title,
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

  firstSearch() {
    this.searchDirectory(this.itemsRef);
    this.setState({filterValue:"All",searchedTextBar:"All"})
  }

  searchDirectory(itemsRef) {
    this.setState({searchedTextBar:true})
    var searchText = this.state.searchText.charAt(0).toString().toLowerCase();

    if (searchText == ""){
      this.listenForItems(itemsRef);
    }else{
      itemsRef.orderByChild("searchable").startAt(searchText).endAt(searchText).on('value', (snap) => {

        items = [];
        snap.forEach((child) => {
          items.push({
            active: child.val().active,
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
            searchable: child.val().searchable,
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

  firstFilter(option) {
    this.setState({filterValue:option,searchText:""});
    this.filterDirectory(this.itemsRef,option);
  }

  filterDirectory(itemsRef,option) {
    var filterText = option.toString();

    if (filterText == "All"){
      this.listenForItems(itemsRef);
    }else{
      itemsRef.orderByChild("category").startAt(filterText).endAt(filterText).on('value', (snap) => {

        items = [];
        snap.forEach((child) => {
          items.push({
            active: child.val().active,
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
            searchable: child.val().searchable,
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
    let index = 0;
        const data = [
            { key: index++, section: true, label: 'Categories' },
            { key: index++, label: 'All' },
            { key: index++, label: 'American' },
            { key: index++, label: 'Asian' },
            { key: index++, label: 'Bar & Grill' },
            { key: index++, label: 'BBQ' },
            { key: index++, label: 'Breakfast' },
            { key: index++, label: 'Buffet' },
            { key: index++, label: 'Cafe' },
            { key: index++, label: 'Chicken' },
            { key: index++, label: 'Chinese' },
            { key: index++, label: 'Coffee Shop' },
            { key: index++, label: 'Dessert' },
            { key: index++, label: 'Fast Food' },
            { key: index++, label: 'Italian' },
            { key: index++, label: 'Japanese' },
            { key: index++, label: 'Mexican' },
            { key: index++, label: 'Night Club' },
            { key: index++, label: 'Pizza' },
            { key: index++, label: 'Sushi' },
            { key: index++, label: 'Vietnamese' },
        ];
    return (

      <View style={styles.container}>
      <ScrollView>
      <View style={{flexDirection:'row',backgroundColor:'#e1e8ef',}}>
        <SearchBar
            returnKeyType='search'
            lightTheme
            placeholder='Search...'
            value={this.state.searchText}
            onChangeText={(text) => this.setState({searchText:text})}
            onSubmitEditing={() => this.firstSearch()}
            containerStyle={{width:screenWidth,borderBottomColor:'#e1e8ef',borderTopColor:'#e1e8ef'}}
        />
      </View>

      <ModalPicker
          selectStyle={{borderRadius:0,borderRadius:0,borderColor:'transparent'}}
          selectTextStyle={{fontFamily:'oswald-bold',fontSize:20}}
          data={data}
          sectionTextStyle={{color:'#000000', fontFamily:'oswald-bold',fontSize:20}}
          optionTextStyle={{color:'#c0392b', fontFamily:'oswald-regular',fontSize:20}}
          cancelTextStyle={{color:'#e74c3c', fontFamily:'oswald-regular',fontSize:20}}
          cancelStyle={{backgroundColor:'#ffffff'}}
          initValue={this.state.filterValue.toString()}
          onChange={(option)=> this.firstFilter(option.label)}>



      </ModalPicker>

        <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderItem.bind(this)}
            enableEmptySections={true}
            scrollRenderAheadDistance={20}
            initialListSize={2}
        />
        </ScrollView>
      </View>
    );
  }

  _renderItem(item) {


    if(item.active === false){
      return (
        <View></View>
      )
    }else{
      if(item.description == undefined){
        var descriptonString = "";
      }else{
        var descriptonString = item.description;
      }
    if (descriptonString.length > 85){
      var newDescriptionString = descriptonString.substring(0,83-3)+"..."
    }else{
      newDescriptionString = descriptonString
    }

          return (
            <View style={styles.listContainter}>
              <TouchableOpacity onPress={() => Actions.DirectoryDetail({title:item.title,item})}>
                <View style={{backgroundColor:'white',flexDirection:'row',paddingLeft:5,}}>
                  <View style={{alignItems:'flex-start',flex:3,}}>
                    <Text style={{fontFamily:'oswald-bold',fontSize:screenWidth/15,color:"#000000"}}>{item.title}</Text>
                    <Text style={{paddingBottom:4,fontFamily:'oswald-regular',color:'#c0392b'}}>{item.category}</Text>
                    <Text>{newDescriptionString}</Text>
                  </View>
                  <View style={{alignItems:'flex-end',flex:2,paddingRight:5}}>
                    <Image
                      onLoadStart={() => this.setState({loading:true})}
                      onLoad={() => this.setState({loading:false})}
                      style={styles.listImage}
                      source={{uri: item.profile}}
                      resizeMode={'contain'}
                      indicator={ActivityIndicator}
                    >
                    </Image>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
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
    marginTop:1,
  },
  listImage:{
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
