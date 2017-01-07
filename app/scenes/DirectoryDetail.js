import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import { Actions } from 'react-native-router-flux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {Button, List, ListItem, Card, Icon} from 'react-native-elements';
import ImageSlider from 'react-native-image-slider';
import Communications from 'react-native-communications';
import firebaseApp from "../components/firebaseconfig.js";
import moment from 'moment';
import StarRating from 'react-native-star-rating';
import Image from 'react-native-image-progress';
import Carousel from 'react-native-snap-carousel';
import shuffle from 'shuffle-array';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Dimensions,
  Platform,
  ScrollView,
  Alert
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const today = moment().isoWeekday();
const funWords = ['Drat','Shucks','Dang','Cripes','Gosh-Darn','Nuts','Kod-Swallop','Nonsense','Tarnation'];

class DirectoryDetail extends Component {

  constructor(props) {
     super(props);
     this.state = {
       loading:true,
       monday: <Text style={{color:'#7f8c8d'}}>Monday</Text>,
       tuesday: <Text style={{color:'#7f8c8d'}}>Tuesday</Text>,
       wednesday: <Text style={{color:'#7f8c8d'}}>Wednesday</Text>,
       thursday: <Text style={{color:'#7f8c8d'}}>Thursday</Text>,
       friday: <Text style={{color:'#7f8c8d'}}>Friday</Text>,
       saturday: <Text style={{color:'#7f8c8d'}}>Saturday</Text>,
       sunday: <Text style={{color:'#7f8c8d'}}>Sunday</Text>,
     };

   }


  componentWillMount(){
    this.getServerInfo()
  }

  componentDidMount(){
    this.getDayOfWeek();
    this.recordVisits();
  }

  recordVisits(currentVisits){
    var dateSubmitted = moment().format('LL h:mm A');
    var unixTimeStamp = moment().unix();
    var userPlatform = Platform.OS === 'ios'? "ios" : "android";
    this.statisticsRef.push({
       restaurant:this.props.title,
       platform:userPlatform,
       visited: dateSubmitted,
       timestamp:unixTimeStamp,
    });
  }

  getServerInfo(){
    this.directoryRef = this.getRef().child('directory');
    this.statisticsRef = this.getRef().child("directoryStatistics");
    this.listenForDirectory(this.directoryRef);
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  listenForDirectory(directoryRef) {
    directoryRef.orderByChild("title").startAt(this.props.title).endAt(this.props.title).on('value', (snap) => {
      var items = [];
      snap.forEach((child) => {
        items.push({
          address: child.val().address,
          addressURL: child.val().addressURL,
          averagePrice: child.val().averagePrice,
          background:child.val().background,
          category: child.val().category,
          coupons: child.val().coupons,
          delivery: child.val().delivery,
          description: child.val().description,
          hours: child.val().hours,
          images: child.val().images,
          lastUpdate: child.val().lastUpdate,
          mapImage: child.val().mapImage,
          menu: child.val().menu,
          phone: child.val().phone,
          profile: child.val().profile,
          rate: child.val().rate,
          reviews: child.val().reviews,
          local: child.val().local,
          wifi: child.val().wifi,
        });
      });

      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      var background = items[0].background.toString();
      var lastUpdate = items[0].lastUpdate.toString();
      var local = items[0].local;
      var wifi = items[0].wifi;
      var delivery = items[0].delivery;
      var phone = items[0].phone;
      var menu = items[0].menu;
      var coupons = items[0].coupons;
      var description = items[0].description;
      var images = items[0].images;
      var hours = items[0].hours;
      var phone = items[0].phone.toString();
      var reviews = items[0].reviews;
      var reviewsReversed = reviews.reverse();
      var reviewsSliced = reviews.slice(0,3);
      var reviewsSlicedReversed = reviewsSliced.reverse();
      var address = items[0].address;
      var mapImage = items[0].mapImage;
      var addressURL = items[0].addressURL;

      this.setState({
        background:background,
        lastUpdate:lastUpdate,
        local:local,
        wifi:wifi,
        delivery:delivery,
        phone:phone,
        menu:menu,
        coupons:coupons,
        description:description,
        images:images,
        hours:hours,
        phone:phone,
        reviews:reviews,
        reviewsDataSource: ds.cloneWithRows(reviewsSlicedReversed),
        reviewsTotal: ds.cloneWithRows(reviews),
        address:address,
        mapImage:mapImage,
        addressURL:addressURL,
      });


    });
  }

  getDayOfWeek(){
   var dayMonday = this.state.hours[1];
   var dayTuesday = this.state.hours[2];
   var dayWednesday = this.state.hours[3];
   var dayThursday = this.state.hours[4];
   var dayFriday = this.state.hours[5];
   var daySaturday = this.state.hours[6];
   var daySunday = this.state.hours[7];
   var dayOfTheWeek = moment().format('dddd');
   this.setState({
     mondayHours:<Text style={{color:'#7f8c8d'}}>{dayMonday}</Text>,
     tuesdayHours:<Text style={{color:'#7f8c8d'}}>{dayTuesday}</Text>,
     wednesdaHours:<Text style={{color:'#7f8c8d'}}>{dayWednesday}</Text>,
     thursdayHours:<Text style={{color:'#7f8c8d'}}>{dayThursday}</Text>,
     fridayHours:<Text style={{color:'#7f8c8d'}}>{dayFriday}</Text>,
     saturdayHours:<Text style={{color:'#7f8c8d'}}>{daySaturday}</Text>,
     sundayHours:<Text style={{color:'#7f8c8d'}}>{daySunday}</Text>,
   })
   if (dayOfTheWeek == "Monday"){
     this.setState({
       monday: <Text style={{color:'#c0392b',fontWeight:'bold'}}>Monday</Text>,
       mondayHours: <Text style={{color:'#c0392b',fontWeight:'bold'}}>{dayMonday}</Text>
     });
   }else if (dayOfTheWeek == "Tuesday"){
     this.setState({
       tuesday: <Text style={{color:'#c0392b',fontWeight:'bold'}}>Tuesday</Text>,
       tuesdayHours: <Text style={{color:'#c0392b',fontWeight:'bold'}}>{dayTuesday}</Text>
     });
   }else if (dayOfTheWeek == "Wednesday"){
     this.setState({
       wednesday: <Text style={{color:'#c0392b',fontWeight:'bold'}}>Wednesday</Text>,
       wednesdaHours: <Text style={{color:'#c0392b',fontWeight:'bold'}}>{dayWednesday}</Text>
     });
   }else if (dayOfTheWeek == "Thursday"){
     this.setState({
       thursday: <Text style={{color:'#c0392b',fontWeight:'bold'}}>Thursday</Text>,
       thursdayHours: <Text style={{color:'#c0392b',fontWeight:'bold'}}>{dayThursday}</Text>
     });
   }else if (dayOfTheWeek == "Friday"){
     this.setState({
       friday: <Text style={{color:'#c0392b',fontWeight:'bold'}}>Friday</Text>,
       fridayHours: <Text style={{color:'#c0392b',fontWeight:'bold'}}>{dayFriday}</Text>
     });
   }else if (dayOfTheWeek == "Saturday"){
     this.setState({
       saturday: <Text style={{color:'#c0392b',fontWeight:'bold'}}>Saturday</Text>,
       saturdayHours: <Text style={{color:'#c0392b',fontWeight:'bold'}}>{daySaturday}</Text>
     });
   }else if (dayOfTheWeek == "Sunday"){
     this.setState({
       sunday: <Text style={{color:'#c0392b',fontWeight:'bold'}}>Sunday</Text>,
       sundayHours: <Text style={{color:'#c0392b',fontWeight:'bold'}}>{daySunday}</Text>
     });
   }else{
     return {}
   }
  }

  getReviewsCount(){
    if(this.state.reviews[0].active === false){
      return(
        <View style={{flexDirection:'row'}}>
          <Text style={{fontSize:20,fontFamily:'oswald-bold',color:'#000000',paddingLeft:10}}>Reviews</Text>
          <Text style={{fontSize:20,fontFamily:'oswald-bold',color:'#c0392b'}}> (0)</Text>
        </View>
      );
    }else{
      return(
        <View style={{flexDirection:'row'}}>
          <Text style={{fontSize:20,fontFamily:'oswald-bold',color:'#000000',paddingLeft:10}}>Reviews</Text>
          <Text style={{fontSize:20,fontFamily:'oswald-bold',color:'#c0392b'}}> ({this.state.reviewsTotal.getRowCount()})</Text>
        </View>
      );
    }
  }

  render(){
    return(
      <View style={{flex:1,backgroundColor:'#FFFFFF',paddingTop:40}}>
        <ParallaxScrollView
         fadeOutForeground={false}
         renderBackground={() => <Image source={{ uri: this.state.background, width: screenWidth, height: screenHeight / 2 }} onLoadStart={() => this.setState({loading:true})} onLoad={() => this.setState({loading:false})}/>}
         contentBackgroundColor="#ffffff"
         parallaxHeaderHeight={screenHeight / 2}>
          <View>
            <View style={{height:10,backgroundColor:'#c0392b'}}>
            </View>
            <Text style={{textAlign: 'center',fontFamily:'oswald-regular',color:'#95a5a6',fontSize:12}}>
              Last update on {this.state.lastUpdate}
            </Text>
            <View style={{flexDirection:'row',marginTop:10,justifyContent:'center'}}>
            {this.state.local &&
              <Icon
                name='cutlery'
                type='font-awesome'
                color='#c0392b'
                iconStyle={{paddingRight:5}}
              />
            }
              {this.state.wifi &&
                <Icon
                  name='wifi'
                  type='font-awesome'
                  color='#3498db'
                  iconStyle={{paddingRight:5}}
                />
              }
              {this.state.delivery &&
                <Icon
                  name='car'
                  type='font-awesome'
                  color='#F9690E'
                />
              }
            </View>
            <Text style={{fontSize: 45,textAlign: 'center',marginBottom: 10,paddingTop:0,paddingBottom:15,fontFamily:'oswald-bold',color:"black"}}>
              {this.props.title}
            </Text>
            <View style={{flexDirection:'row',marginBottom:14}}>
              <View style={{width:screenWidth/3,alignItems:'center'}}>
                <Icon
                  reverse
                  raised
                  name='phone'
                  type='font-awesome'
                  color='#2bc064'
                  onPress={() => Communications.phonecall(this.state.phone, true)}
                />
                <Text style={{fontFamily:"oswald-regular",color:'#7f8c8d'}}>
                  Call
                </Text>
              </View>
              <View style={{width:screenWidth/3,alignItems:'center'}}>
                <Icon
                  reverse
                  raised
                  name='map'
                  type='font-awesome'
                  color='#8e44ad'
                  onPress={() => Actions.MenuIndex({menu:this.state.menu})}
                />
                <Text style={{fontFamily:"oswald-regular",color:'#7f8c8d'}}>
                  Menu
                </Text>
              </View>
              <View style={{width:screenWidth/3,alignItems:'center'}}>
                <Icon
                  reverse
                  raised
                  name='tags'
                  type='font-awesome'
                  color='#f50'
                  onPress={() => Actions.CouponDetail({coupons:this.state.coupons})}
                />
                <Text style={{fontFamily:"oswald-regular",color:'#7f8c8d'}}>
                  Coupons
                </Text>
              </View>
            </View>
            <View style={{padding:10}}>
              <Text style={{fontSize:20,fontFamily:'oswald-bold',color:'#000000'}}>
                Summary
              </Text>
              <Text style={{color:'#7f8c8d'}}>
                {this.state.description}
              </Text>
            </View>
            <View style={{padding:10}}>
              <Text style={{fontSize:20,fontFamily:'oswald-bold',color:'#000000'}}>
                Images
              </Text>
              <Text style={{color:'#7f8c8d'}}>
                Swipe for more photos
              </Text>
            </View>
            <Carousel
             ref={'carousel'}
             items={this.state.images}
             renderItem={this._renderImage}
             sliderWidth={screenWidth}
             itemWidth={screenWidth - 20}
            />
            <View style={{padding:10}}>
              <Text style={{fontSize:20,fontFamily:'oswald-bold',color:'#000000'}}>
                Hours
              </Text>
              <View style={{flexDirection:'row',paddingLeft:6}}>
                <View style={{width:screenWidth / 3.5}}>
                  <Text>{this.state.monday}</Text>
                  <Text>{this.state.tuesday}</Text>
                  <Text>{this.state.wednesday}</Text>
                  <Text>{this.state.thursday}</Text>
                  <Text>{this.state.friday}</Text>
                  <Text>{this.state.saturday}</Text>
                  <Text >{this.state.sunday}</Text>
                </View>
                <View style={{width:screenWidth / 1.6}}>
                  <Text>{this.state.mondayHours}</Text>
                  <Text>{this.state.tuesdayHours}</Text>
                  <Text>{this.state.wednesdaHours}</Text>
                  <Text>{this.state.thursdayHours}</Text>
                  <Text>{this.state.fridayHours}</Text>
                  <Text>{this.state.saturdayHours}</Text>
                  <Text>{this.state.sundayHours}</Text>
                </View>
              </View>
            </View>
            <View>
              {this.getReviewsCount()}
              <ListView
                dataSource={this.state.reviewsDataSource}
                renderRow={this._renderReview.bind(this)}
                enableEmptySections={true}
              />
              <View style={{marginBottom:10}}></View>
            </View>
            <View style={{flexDirection:'row',marginBottom:14}}>
              <View style={{width:screenWidth/2,alignItems:'center'}}>
                <Icon
                  reverse
                  raised
                  name='comments-o'
                  type='font-awesome'
                  color='#e67e22'
                  onPress={() => Actions.ReviewFullList({restaurantTitle:this.props.title, reviews:this.state.reviews})}
                />
                <Text style={{fontFamily:"oswald-regular",color:'#7f8c8d'}}>
                  View All Reviews
                </Text>
              </View>
              <View style={{width:screenWidth/2,alignItems:'center'}}>
                <Icon
                  reverse
                  raised
                  name='edit'
                  type='font-awesome'
                  color='#3498db'
                  onPress={() => Actions.ReviewDetail({restaurantTitle:this.props.title,fromDirectory:true})}
                />
                <Text style={{fontFamily:"oswald-regular",color:'#7f8c8d'}}>
                  Write Review
                </Text>
              </View>
            </View>
            <View style={{padding:10,}}>
              <Text style={{fontSize:20,fontFamily:'oswald-bold',color:'#000000'}}>
                Address
              </Text>
              <Text style={{color:'#7f8c8d'}}>
              {this.state.address}
              </Text>
            </View>
            <View style={{width:screenWidth,height:screenHeight / 2, }}>
              <Image
                onLoadStart={() => this.setState({loading:true})}
                onLoad={() => this.setState({loading:false})}
                style={{width:screenWidth,height:screenHeight / 2, }}
                source={{uri: this.state.mapImage}}
              >
              <View style={{marginTop:screenHeight/10,alignItems:'center'}}>
                <Button
                  raised
                  iconRight
                  borderRadius={5}
                  icon={{name: 'map'}}
                  fontFamily="oswald-bold"
                  fontSize={18}
                  buttonStyle={{marginBottom:5,}}
                  backgroundColor="#e74c3c"
                  title='Get Directions'
                  onPress={() => Actions.MapDetail({addressURL:this.state.addressURL})}
                />
              </View>
              </Image>
            </View>


          </View>
        </ParallaxScrollView>
      </View>
    )
  }

  _renderImage (data, index){
    if(data == "dd"){
      var randomWord = shuffle(funWords);
      return(
        <View style={{alignItems:'center',justifyContent:'center',width:screenWidth,height:screenHeight/2.5}}>
        <Icon
          name='meh-o'
          type='font-awesome'
          color='#c0392b'
        />
          <Text style={{fontFamily:'oswald-bold',color:'#7f8c8d'}}>{randomWord[0]}. Currently no Images</Text>
        </View>
      )
    }else{
      return(
          <Image
           style={{width: screenWidth - 20, height: screenHeight/2.5,borderRadius:10}}
           source={{uri: data}}
          />
      )
    }
  }

  _renderReview(item) {
    if (item.review == "null"){
      return (
        <View>
          <Card containerStyle={{borderWidth:1,borderColor:'#e1e8ef',shadowRadius: 0,shadowColor: '#ffffff'}}>
            <View style={{width:50}}>
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
            <Text style={{color:'#c0392b',fontFamily:'oswald-regular',fontSize:15,marginBottom:6}}>
              No Reviews yet, be the first!
            </Text>
            <Text style={{fontStyle:'italic',color:'#7f8c8d',fontSize:13}}>
              No sign up required
            </Text>
          </Card>
        </View>
      )
    }else{
      return (
        <View>
          <Card containerStyle={{borderWidth:1,borderColor:'#e1e8ef',shadowRadius: 0,shadowColor: '#ffffff'}}>
            <View style={{width:50}}>
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
            <Text style={{color:'#000000',fontSize:15,marginBottom:15}}>
              {item.review}
            </Text>
            <Text style={{fontStyle:'italic',color:'#c0392b',fontSize:13}}>
              {item.name} on {item.date}
            </Text>
          </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(DirectoryDetail);
