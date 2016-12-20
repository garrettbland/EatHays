import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {Button} from 'react-native-elements';
import firebaseApp from "../components/firebaseconfig.js";
import moment from 'moment';
import Image from 'react-native-image-progress';
import {
  Text,
  View,
  Dimensions,
  Platform,
  ListView,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class SpecialDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:true,
    };
    this.recordItemsRef = this.getRef().child("specialsStatistics");
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  componentDidMount(){
    this.recordVisits()
  }

  recordVisits(currentVisits){
    var dateSubmitted = moment().format('LL h:mm A');
    var unixTimeStamp = moment().unix();
    var userPlatform = Platform.OS === 'ios'? "ios" : "android";
    this.recordItemsRef.push({
      restaurant:this.props.title,
      platform:userPlatform,
      visited: dateSubmitted,
      timestamp:unixTimeStamp,
      special:this.props.special,
    });
  }

  listenForItems(itemsRef) {
    itemsRef.orderByChild("title").startAt(this.props.title).endAt(this.props.title).on('value', (snap) => {
      items = [];
      snap.forEach((child) => {
        items.push({
          active: child.val().active,
          address: child.val().address,
          addressURL: child.val().addressURL,
          averagePrice: child.val().averagePrice,
          background:child.val().background,
          category: child.val().category,
          coupons: child.val().coupons,
          description: child.val().description,
          hours: child.val().hours,
          images: child.val().images,
          mapImage: child.val().mapImage,
          menu: child.val().menu,
          parking: child.val().parking,
          phone: child.val().phone,
          profile: child.val().profile,
          rate: child.val().rate,
          reviews: child.val().reviews,
          searchable: child.val().searchable,
          title: child.val().title,
          _key: child.key,
        });
      });
      var stringify = JSON.stringify(items);
      this.setState({
        items:stringify.toString()
      });
    });
  }

  componentWillMount() {
    this.itemsRef = this.getRef().child('directory');
    this.listenForItems(this.itemsRef);
  }

  render() {
    if(this.state.items == undefined){
      return(<View></View>);
    }else{
      var itemz = JSON.parse(this.state.items);
      var item = itemz[0];
    }
    return (
      <View style={{paddingTop:Platform.OS === 'ios'? 64 : 54, backgroundColor:'#ffffff',flex:1}}>
        <ParallaxScrollView
             fadeOutForeground={false}
             renderBackground={() => <Image source={{ uri: this.props.background, width: window.width, height: screenHeight / 2 }} onLoadStart={() => this.setState({loading:true})} onLoad={() => this.setState({loading:false})}/>}
             contentBackgroundColor="#ffffff"
             parallaxHeaderHeight={screenHeight / 2}>
             <View style={{height:10,backgroundColor:'#c0392b'}}>
             </View>
             <View>
               <View style={{ paddingTop:12,alignItems: 'center', justifyContent: 'center' }}>
                  <Image resizeMode={'contain'} source={{ uri: this.props.profile, width: screenWidth /2, height: 100 }} onLoadStart={() => this.setState({loading:true})} onLoad={() => this.setState({loading:false})}/>
               </View>
               <View>
                 <Text style={{fontSize: 40,textAlign: 'center',margin:5,paddingBottom:15,fontFamily:'oswald-bold',color:"black"}}>
                    {this.props.title} {this.props.day} Special
                 </Text>
               </View>
               <View>
                 <Text style={{fontSize:screenWidth / 15,fontFamily:'oswald-regular',color:'#c0392b',textAlign:'center',padding:5,paddingBottom:15}}>
                    {this.props.specialDescription}
                 </Text>
               </View>
               <View>
                 <Button
                    raised
                    iconRight
                    borderRadius={5}
                    icon={{name: 'chevron-right'}}
                    fontFamily="oswald-bold"
                    fontSize={18}
                    buttonStyle={{marginBottom:10}}
                    backgroundColor="#2bc064"
                    title='View Restaurant'
                    onPress={() => Actions.DirectoryDetail({title:this.props.title,item,specialHashTag:this.props.special})}
                  />
                  <Button
                    raised
                    iconRight
                    borderRadius={5}
                    icon={{name: 'edit'}}
                    fontFamily="oswald-bold"
                    fontSize={18}
                    buttonStyle={{marginBottom:5}}
                    backgroundColor="#3498db"
                    title='Review this meal'
                    onPress={() => Actions.ReviewDetail({restaurantTitle:this.props.title})}
                  />
                </View>
             </View>
        </ParallaxScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialDetail);
