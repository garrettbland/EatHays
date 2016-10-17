import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {Button} from 'react-native-elements';
import ImageSlider from 'react-native-image-slider';
import Communications from 'react-native-communications';

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


     this.state = {
       phoneNumberString:this.props.item.phone.toString(),
       reviewsDataSource: ds.cloneWithRows(this.props.item.reviews),
       hoursDataSource: ds.cloneWithRows(this.props.item.hours),
       imagesDataSource: ds.cloneWithRows(this.props.item.images),
     };


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
            <ListView
              style={{}}
              dataSource={this.state.hoursDataSource}
              renderRow={(data) => <View><Text>{data}</Text></View>}
            />
          </View>

          <View style={{padding:10,}}>
            <Text style={{fontSize:20,fontWeight:'bold',fontFamily:'oswald-regular'}}>Reviews</Text>
            <ListView
              style={{}}
              dataSource={this.state.reviewsDataSource}
              renderRow={(data) => <View><Text>"{data}"</Text></View>}
            />
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
            buttonStyle={{marginBottom:5,}}
            backgroundColor="#3498db"
            title='Write Review'
            onPress={() => Actions.ReviewDetail({restaurantTitle:this.props.title,fromSpecial:true})}
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
