import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {Button, List, ListItem, Card} from 'react-native-elements';
import ImageSlider from 'react-native-image-slider';
import Communications from 'react-native-communications';
import firebaseApp from "../components/firebaseconfig.js";
import moment from 'moment';
import StarRating from 'react-native-star-rating';
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
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const today = moment().isoWeekday();

class DirectoryDetail extends Component {

constructor(props) {
   super(props);
   const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
   var reviewsNotSliced = this.props.item.reviews;
   var reviewsSliced = reviewsNotSliced.slice(0,3);

   var dayMonday = this.props.item.hours[1];
   var dayTuesday = this.props.item.hours[2];
   var dayWednesday = this.props.item.hours[3];
   var dayThursday = this.props.item.hours[4];
   var dayFriday = this.props.item.hours[5];
   var daySaturday = this.props.item.hours[6];
   var daySunday = this.props.item.hours[7];

     this.state = {
       loading:true,
       phoneNumberString:this.props.item.phone.toString(),
       reviewsDataSource: ds.cloneWithRows(reviewsSliced),
       reviewsTotal: ds.cloneWithRows(reviewsNotSliced),
       imagesDataSource: ds.cloneWithRows(this.props.item.images),
       monday: <Text>Monday</Text>,
       tuesday: <Text>Tuesday</Text>,
       wednesday: <Text>Wednesday</Text>,
       thursday: <Text>Thursday</Text>,
       friday: <Text>Friday</Text>,
       saturday: <Text>Saturday</Text>,
       sunday: <Text>Sunday</Text>,
       mondayHours:<Text>{dayMonday}</Text>,
       tuesdayHours:<Text>{dayTuesday}</Text>,
       wednesdaHours:<Text>{dayWednesday}</Text>,
       thursdayHours:<Text>{dayThursday}</Text>,
       fridayHours:<Text>{dayFriday}</Text>,
       saturdayHours:<Text>{daySaturday}</Text>,
       sundayHours:<Text>{daySunday}</Text>,
     };

    this.itemsRef = this.getRef().child("directoryStatistics");


 }

 getDayOfWeek(){
   var dayMonday = this.props.item.hours[1];
   var dayTuesday = this.props.item.hours[2];
   var dayWednesday = this.props.item.hours[3];
   var dayThursday = this.props.item.hours[4];
   var dayFriday = this.props.item.hours[5];
   var daySaturday = this.props.item.hours[6];
   var daySunday = this.props.item.hours[7];
   var dayOfTheWeek = moment().format('dddd');
   if (dayOfTheWeek == "Monday"){
     this.setState({
       monday: <Text style={{color:'#c0392b',fontWeight:'bold'}}>Monday</Text>,
       mondayHours: <Text style={{color:'#c0392b',fontWeight:'bold'}}>{dayMonday}</Text>
     })
   }else if (dayOfTheWeek == "Tuesday"){
     this.setState({
       tuesday: <Text style={{color:'#c0392b',fontWeight:'bold'}}>Tuesday</Text>,
       tuesdayHours: <Text style={{color:'#c0392b',fontWeight:'bold'}}>{dayTuesday}</Text>
     })
   }else if (dayOfTheWeek == "Wednesday"){
     this.setState({
       wednesday: <Text style={{color:'#c0392b',fontWeight:'bold'}}>Wednesday</Text>,
       wednesdaHours: <Text style={{color:'#c0392b',fontWeight:'bold'}}>{dayWednesday}</Text>
     })
   }else if (dayOfTheWeek == "Thursday"){
     this.setState({
       thursday: <Text style={{color:'#c0392b',fontWeight:'bold'}}>Thursday</Text>,
       thursdayHours: <Text style={{color:'#c0392b',fontWeight:'bold'}}>{dayThursday}</Text>
     })
   }else if (dayOfTheWeek == "Friday"){
     this.setState({
       friday: <Text style={{color:'#c0392b',fontWeight:'bold'}}>Friday</Text>,
       fridayHours: <Text style={{color:'#c0392b',fontWeight:'bold'}}>{dayFriday}</Text>
     })
   }else if (dayOfTheWeek == "Saturday"){
     this.setState({
       saturday: <Text style={{color:'#c0392b',fontWeight:'bold'}}>Saturday</Text>,
       saturdayHours: <Text style={{color:'#c0392b',fontWeight:'bold'}}>{daySaturday}</Text>
     })
   }else if (dayOfTheWeek == "Sunday"){
     this.setState({
       sunday: <Text style={{color:'#c0392b',fontWeight:'bold'}}>Sunday</Text>,
       sundayHours: <Text style={{color:'#c0392b',fontWeight:'bold'}}>{daySunday}</Text>
     })
   }else{

   }
 }

 getRef() {
   return firebaseApp.database().ref();
 }

componentDidMount(){
  this.recordVisits();
  this.getDayOfWeek();
}

_renderItem(item) {
  if (item.review == "null"){
    return (
      <View>
      <Card>
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
         <Text style={{fontStyle:'italic',color:'#7f8c8d',fontSize:13}}>No sign up required</Text>
       </Card>
      </View>
    )
  }else{
        return (
          <View >
            <Card>
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
               {item.review}
               </Text>

               <Text style={{fontStyle:'italic',color:'#7f8c8d',fontSize:13}}>{item.name} on {item.date}</Text>
             </Card>
          </View>
        );
      }
    }


 recordVisits(currentVisits){
   var dateSubmitted = moment().format('LL h:mm A');
   var unixTimeStamp = moment().unix();
   var userPlatform = Platform.OS === 'ios'? "ios" : "android";
   this.itemsRef.push({
       restaurant:this.props.title,
       platform:userPlatform,
       visited: dateSubmitted,
       timestamp:unixTimeStamp,
     });
 }

 getReviewsCount(){
   return(
     <View style={{flex:1,flexDirection:'row'}}>
       <Text style={{fontSize:20,fontWeight:'bold',fontFamily:'oswald-bold',color:'#000000',paddingLeft:10}}>Reviews</Text>
       <Text style={{fontSize:20,fontFamily:'oswald-bold',color:'#c0392b'}}> ({this.state.reviewsTotal.getRowCount()})</Text>
     </View>
   );
 }


render() {

  return (
    <View style={styles.container}>

    <ParallaxScrollView
         fadeOutForeground={false}
         renderBackground={() => <Image source={{ uri: this.props.item.background, width: window.width, height: screenHeight / 2 }} onLoadStart={() => this.setState({loading:true})} onLoad={() => this.setState({loading:false})}/>}
         contentBackgroundColor="#ffffff"
         parallaxHeaderHeight={screenHeight / 2}
  >
         <View style={styles.detailContainer}>
        <View style={{height:10,backgroundColor:'#c0392b',}}></View>

        {
          this.state.loading &&

          <ActivityIndicator
            size="large"
            color="#3498db"
            style={styles.activityStyle}
          />

        }

         <Text style={styles.welcomeDay}>
           {this.props.title}
         </Text>

          <View style={{padding:10,}}>
            <Text style={{fontSize:20,fontWeight:'bold',fontFamily:'oswald-bold',color:'#000000'}}>Summary</Text>
            <Text>{this.props.item.description}</Text>
          </View>

          <View style={{padding:10}}>
            <Text style={{fontSize:20,fontWeight:'bold',fontFamily:'oswald-bold',color:'#000000'}}>Images</Text>
            <Text>Swipe for more photos</Text>
          </View>
          <View>
            <ImageSlider
                images={this.props.item.images}
                height={screenHeight / 3}
            />
          </View>



          <View style={{padding:10,}}>
            <Text style={{fontSize:20,fontWeight:'bold',fontFamily:'oswald-bold',color:'#000000'}}>Hours</Text>

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

              <View style={{width:screenWidth / 2}}>
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

          <View style={{marginBottom:14}}>
          <Button
            raised
            iconRight
            borderRadius={5}
            icon={{name: 'phone'}}
            fontFamily="oswald-bold"
            fontSize={18}
            buttonStyle={{marginBottom:5,}}
            backgroundColor="#2bc064"
            title={this.state.phoneNumberString}
            onPress={() => Communications.phonecall(this.props.item.phone, true)}
          />
          </View>

          <View style={{marginBottom:14}}>
          <Button
            raised
            iconRight
            borderRadius={5}
            icon={{name: 'chevron-right'}}
            fontFamily="oswald-bold"
            fontSize={18}
            buttonStyle={{marginBottom:5,}}
            backgroundColor="#8e44ad"
            title='View Menu'
            onPress={() => Actions.MenuDetail({menu:this.props.item.menu})}
          />
          </View>

          <View style={{marginBottom:14}}>
          <Button
            raised
            iconRight
            borderRadius={5}
            icon={{name: 'chevron-right'}}
            fontFamily="oswald-bold"
            fontSize={18}
            buttonStyle={{marginBottom:5}}
            backgroundColor="#34495e"
            title='Coupons'
            onPress={() => Actions.CouponDetail({coupons:this.props.item.coupons})}
          />
          </View>

          <View>
            {this.getReviewsCount()}
              <ListView
                  dataSource={this.state.reviewsDataSource}
                  renderRow={this._renderItem.bind(this)}
                  enableEmptySections={true}
              />
              <View style={{marginBottom:10}}></View>
          </View>

          <View style={{marginBottom:4}}>
          <Button
            raised
            small
            iconRight
            borderRadius={5}
            icon={{name: 'chevron-right'}}
            fontFamily="oswald-bold"
            fontSize={14}
            buttonStyle={{marginBottom:5,}}
            backgroundColor="#e67e22"
            title="View All Reviews"
            onPress={() => Actions.ReviewFullList({restaurantTitle:this.props.title, reviews:this.props.item.reviews})}
          />
          </View>

      <View style={{marginBottom:14}}>
        <Button
          raised
          iconRight
          borderRadius={5}
          icon={{name: 'chevron-right'}}
          fontFamily="oswald-bold"
          fontSize={18}
          buttonStyle={{marginBottom:5,}}
          backgroundColor="#3498db"
          title='Write Review'
          onPress={() => Actions.ReviewDetail({restaurantTitle:this.props.title,fromDirectory:true})}
        />
        </View>





          <View style={{padding:10,}}>
              <Text style={{fontSize:20,fontWeight:'bold',fontFamily:'oswald-bold',color:'#000000'}}>Address</Text>
              <Text style={{paddingLeft:6}}>{this.props.item.address}</Text>
          </View>

          <View style={{flex:1,width:screenWidth,height:screenHeight / 2, }}>
          <Image
            onLoadStart={() => this.setState({loading:true})}
            onLoad={() => this.setState({loading:false})}
            style={{width:screenWidth,height:screenHeight / 2, }}
            source={{uri: this.props.item.mapImage}}
          >
          <View style={{flex:1,marginTop:screenHeight/10,alignItems:'center'}}>
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
            onPress={() => Actions.MapDetail({addressURL:this.props.item.addressURL})}
          />
          </View>
          </Image>
          </View>

         </View>
       </ParallaxScrollView>

    </View>
  )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:Platform.OS === 'ios'? 64 : 54,
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
  welcomeDay: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    paddingTop:20,
    paddingBottom:15,
    fontFamily:'oswald-bold',
    color:"black",
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

export default connect(mapStateToProps, mapDispatchToProps)(DirectoryDetail);
