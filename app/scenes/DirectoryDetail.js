import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {Button} from 'react-native-elements';
import ImageSlider from 'react-native-image-slider';
import Communications from 'react-native-communications';
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
  Platform,
  ScrollView,
} from 'react-native';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class DirectoryDetail extends Component {



constructor(props) {
   super(props);
   const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
   var reviewsNotSliced = this.props.item.reviews;
   var reviewsSliced = reviewsNotSliced.slice(0,3);
     this.state = {
       phoneNumberString:this.props.item.phone.toString(),
       reviewsDataSource: ds.cloneWithRows(reviewsSliced),
       imagesDataSource: ds.cloneWithRows(this.props.item.images),
       monday: <Text>Monday</Text>,
       tuesday: <Text>Tuesday</Text>,
       wednesday: <Text>Wednesday</Text>,
       thursday: <Text>Thursday</Text>,
       friday: <Text>Friday</Text>,
       saturday: <Text>Saturday</Text>,
       sunday: <Text>Sunday</Text>
     };


    this.itemsRef = this.getRef().child("directoryStatistics");


 }

 getDayOfWeek(){
   var dayOfTheWeek = moment().format('dddd');
   if (dayOfTheWeek == "Monday"){
     this.setState({monday: <Text style={{color:'#c0392b',fontWeight:'bold'}}>Monday</Text>})
   }else if (dayOfTheWeek == "Tuesday"){
     this.setState({tuesday: <Text style={{color:'#c0392b',fontWeight:'bold'}}>Tuesday</Text>})
   }else if (dayOfTheWeek == "Wednesday"){
     this.setState({wednesday: <Text style={{color:'#c0392b',fontWeight:'bold'}}>Wednesday</Text>})
   }else if (dayOfTheWeek == "Thursday"){
     this.setState({thursday: <Text style={{color:'#c0392b',fontWeight:'bold'}}>Thursday</Text>})
   }else if (dayOfTheWeek == "Friday"){
     this.setState({friday: <Text style={{color:'#c0392b',fontWeight:'bold'}}>Friday</Text>})
   }else if (dayOfTheWeek == "Saturday"){
     this.setState({saturday: <Text style={{color:'#c0392b',fontWeight:'bold'}}>Saturday</Text>})
   }else if (dayOfTheWeek == "Sunday"){
     this.setState({sunday: <Text style={{color:'#c0392b',fontWeight:'bold'}}>Sunday</Text>})
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


render() {

  return (
    <View style={styles.container}>

    <ParallaxScrollView
         fadeOutForeground={false}
         renderBackground={() => <Image source={{ uri: this.props.item.background, width: window.width, height: screenHeight / 2 }}/>}
         contentBackgroundColor="#ffffff"
         parallaxHeaderHeight={screenHeight / 2}
         renderForeground={() => (
          <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
             <Image source={{ uri: this.props.item.profile, width: screenWidth / 4, height: 100 }}/>
           </View>
         )}>
         <View style={styles.detailContainer}>
        <View style={{height:10,backgroundColor:'#c0392b',}}></View>

         <Text style={styles.welcomeDay}>
           {this.props.title}
         </Text>

          <View style={{padding:10,}}>
            <Text style={{fontSize:20,fontWeight:'bold',fontFamily:'oswald-regular'}}>Summary</Text>
            <Text>{this.props.item.description}</Text>
          </View>

          <View style={{padding:10,}}>
            <Text style={{fontSize:20,fontWeight:'bold',fontFamily:'oswald-regular'}}>Media</Text>
            <Text>Swipe for more photos</Text>
            <ImageSlider
                images={this.props.item.images}
                height={screenHeight / 3}
            />
          </View>



          <View style={{padding:10,}}>
            <Text style={{fontSize:20,fontWeight:'bold',fontFamily:'oswald-regular'}}>Hours</Text>

            <View style={{flexDirection:'row',paddingLeft:6}}>
              <View style={{width:screenWidth / 3.5}}>
                <Text style={{height:20}}>{this.state.monday}</Text>
                <Text style={{height:20}}>{this.state.tuesday}</Text>
                <Text style={{height:20}}>{this.state.wednesday}</Text>
                <Text style={{height:20}}>{this.state.thursday}</Text>
                <Text style={{height:20}}>{this.state.friday}</Text>
                <Text style={{height:20}}>{this.state.saturday}</Text>
                <Text style={{height:20}}>{this.state.sunday}</Text>
              </View>

              <View style={{width:screenWidth / 3}}>
              <Text style={{height:20}}>{this.props.item.hours[1]}</Text>
              <Text style={{height:20}}>{this.props.item.hours[2]}</Text>
              <Text style={{height:20}}>{this.props.item.hours[3]}</Text>
              <Text style={{height:20}}>{this.props.item.hours[4]}</Text>
              <Text style={{height:20}}>{this.props.item.hours[5]}</Text>
              <Text style={{height:20}}>{this.props.item.hours[6]}</Text>
              <Text style={{height:20}}>{this.props.item.hours[7]}</Text>
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

          <View style={{padding:10,}}>
            <Text style={{fontSize:20,fontWeight:'bold',fontFamily:'oswald-regular'}}>Reviews</Text>
            <ListView
              style={{paddingTop:10}}
              dataSource={this.state.reviewsDataSource}
              renderRow={(data) =>
                <View style={{flexDirection:'row',paddingBottom:10}}>
                  <View style={{width:screenWidth/10}}>
                    <Icon name="user" style={{fontSize:20, color:"#c0392b"}}></Icon>
                  </View>

                  <View style={{width:screenWidth /1.2}}>
                    <Text style={{fontSize:12,color:'black'}}>"{data}"</Text>
                  </View>
                </View>
              }
            />
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
              <Text style={{fontSize:20,fontWeight:'bold',fontFamily:'oswald-regular'}}>Address</Text>
              <Text>{this.props.item.address}</Text>
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
