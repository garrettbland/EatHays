import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import firebaseApp from '../components/firebaseconfig.js';
import moment from 'moment';
import { SearchBar } from 'react-native-elements';
import Image from 'react-native-image-progress';
import StarRating from 'react-native-star-rating';
//import SGListView from 'react-native-sglistview';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import {
  Text,
  View,
  TouchableOpacity,
  ListView,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Platform,
  Alert,
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
      starCount:'',
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
          category: child.val().category,
          description: child.val().description,
          profile: child.val().profile,
          rate: child.val().rate,
          searchable: child.val().searchable,
          title: child.val().title,
          wifi: child.val().wifi,
          local: child.val().local,
          delivery: child.val().delivery,
          _key: child.key,
        });
      });

      var items = items.sort(function(a, b){
          if(a.searchable < b.searchable) return -1;
          if(a.searchable > b.searchable) return 1;
          return 0;
      })



      var itemsString = JSON.stringify(items);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items),
        itemsString: itemsString,
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

        var itemsString = JSON.parse(this.state.itemsString);
        var items = itemsString.filter(function(d){
          return d.searchable == searchText
        })

        var alphabetize = items.sort(function(a, b){
            if(a.searchable < b.searchable) return -1;
            if(a.searchable > b.searchable) return 1;
            return 0;
        })


        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(items)
        });


    }
  }

  componentWillReceiveProps(nextProps){
  JSON.stringify(this.props.user.filter) !== JSON.stringify(nextProps.user.filter) // Check if it's a new user, you can also use some unique, like the ID
    {
         this.firstFilter(nextProps.user.filter);
    }


  }

  firstFilter(option) {
    this.setState({filterValue:option,searchText:""});
    this.filterDirectory(this.itemsRef,option);
  }

  filterDirectory(itemsRef,option) {
    var filterText = option.toString();
    var itemsString = JSON.parse(this.state.itemsString);


    if (filterText == "All"){


      this.listenForItems(itemsRef)


    }else if(filterText == "Delivery"){
      var delivery = itemsString.filter(function(d){
        return d.delivery === true
      })

      let newArray =  new ListView.DataSource({
              rowHasChanged: (row1, row2) => row1 !== row2,
            }).cloneWithRows(delivery)

        this.setState({
          dataSource: newArray
        });

    }else if(filterText == "Wifi Access"){
      var wifi = itemsString.filter(function(d){
        return d.wifi === true
      })



        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(wifi)
        });
    }else{

        var category = itemsString.filter(function(d){
          return d.category == option
        })

        let newArray =  new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
              }).cloneWithRows(category)

          this.setState({
            dataSource: newArray
          });

      }

  }

  render() {
    return (
      <View style={{flex:1,paddingTop:Platform.OS === 'ios'? 64 : 54,backgroundColor:'#e1e8ef',overflow:'hidden'}}>
          <View>
            {this.state.loading &&
              <ActivityIndicator
                size="large"
                color="#3498db"
                style={{paddingTop:7,paddingBottom:7}}
              />
            }
          </View>
          <ListView
              renderHeader={() =>
                <View style={{marginLeft:10,marginRight:10,marginBottom:10}}>
                  <Sae
                    label={'Search'}
                    labelStyle={{color:'#c0392b', fontFamily:'Oswald-bold',fontSize:40}}
                    iconClass={FontAwesomeIcon}
                    iconName={'search'}
                    iconColor={'#c0392b'}
                    returnKeyType='search'
                    // TextInput props
                    autoCapitalize={'none'}
                    inputStyle={{color:'#000000',fontFamily:'Oswald-regular'}}
                    autoCorrect={false}
                    onChangeText={(text) => this.setState({searchText:text})}
                    onSubmitEditing={() => this.firstSearch()}
                    value={this.state.searchText}
                  />
                </View>
              }
               dataSource={this.state.dataSource}
               removeClippedSubviews={true}
               ref={'listview'}
               initialListSize={5}
               stickyHeaderIndices={[]}
               onEndReachedThreshold={20}
               scrollRenderAheadDistance={screenHeight/2}
               pageSize={1}
               enableEmptySections={true}
               renderRow={this._renderItem.bind(this)}
               renderFooter={() => <View style={{alignItems:'center',marginTop:4,marginBottom:4}}><Text style={{textAlign: 'center',fontFamily:'oswald-regular',color:'#95a5a6'}}>End of Results</Text></View>}
               />
      </View>
    );
  }

  _renderItem(item) {
    if(item.active === false){
      return (<View></View>)
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
          <View style={{backgroundColor:"#ffffff",marginTop:1}}>
            <TouchableOpacity onPress={() => Actions.DirectoryDetail({title:item.title})}>
              <View style={{backgroundColor:'white',flexDirection:'row',paddingLeft:5,}}>
                <View style={{alignItems:'flex-start',flex:3,}}>
                  <Text style={{fontFamily:'oswald-bold',fontSize:screenWidth/15,color:"#000000"}}>{item.title}</Text>
                    <View style={{flexDirection:'row'}}>
                      <Text style={{paddingBottom:2,fontFamily:'oswald-regular',color:'#c0392b',paddingRight:10,fontSize:screenWidth/23}}>
                        {item.category}
                      </Text>
                      <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={item.rate}
                        starColor={'#FFD700'}
                        emptyStarColor={'#bdc3c7'}
                        starSize={20}
                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                      />
                    </View>
                  <Text>{newDescriptionString}</Text>
                </View>
                <View style={{alignItems:'flex-end',flex:2,paddingRight:5}}>
                  <Image
                    onLoad={() => this.setState({loading:false})}
                    style={{width: screenWidth / 3,height: screenWidth / 3}}
                    source={{uri: item.profile}}
                    resizeMode={'contain'}>
                  </Image>
                </View>
              </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Directory);
