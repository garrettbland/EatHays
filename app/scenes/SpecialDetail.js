import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {Button} from 'react-native-elements';
import firebaseApp from "../components/firebaseconfig.js";

import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Platform,
  ListView,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
var items = "ass";

class SpecialDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item:{},
      loading:true,
    };
  }

  getRef() {
    return firebaseApp.database().ref();
  }


  listenForItems(itemsRef) {

    itemsRef.orderByChild("title").startAt(this.props.title).endAt(this.props.title).on('value', (snap) => {

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

    }else{
      var itemz = JSON.parse(this.state.items);
      var item = itemz[0];

    }
    return (
      <View style={styles.container}>
      <ParallaxScrollView
           fadeOutForeground={false}
           renderBackground={() => <Image source={{ uri: this.props.background, width: window.width, height: screenHeight / 2 }}/>}
           contentBackgroundColor="#ffffff"
           parallaxHeaderHeight={screenHeight / 2}
           renderForeground={() => (
            <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
               <Image source={{ uri: this.props.profile, width: screenWidth / 4, height: 100 }}/>
             </View>
           )}>
           <View>
              <Text style={styles.welcomeDay}>{this.props.title} {this.props.day} Special</Text>
              <Text style={styles.description}>{this.props.specialDescription}</Text>
              <Button
                raised
                iconRight
                borderRadius={5}
                icon={{name: 'chevron-right'}}
                fontFamily="oswald-bold"
                fontSize={18}
                buttonStyle={{marginBottom:10,}}
                backgroundColor="#2bc064"
                title='View Restaurant'
                onPress={() => Actions.DirectoryDetail({title:this.props.title,item})}
              />

              <Button
                raised
                iconRight
                borderRadius={5}
                icon={{name: 'chevron-right'}}
                fontFamily="oswald-bold"
                fontSize={18}
                buttonStyle={{marginBottom:5,}}
                backgroundColor="#3498db"
                title='Review this meal'
                onPress={() => Actions.ReviewDetail({restaurantTitle:this.props.title,fromSpecial:true})}
              />
           </View>
         </ParallaxScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop:Platform.OS === 'ios'? 64 : 54,
    backgroundColor:'#ffffff',
    flex:1,
  },
  center: {
    alignItems: 'center',
  },
  activityStyle:{
    paddingTop:12,
  },
  welcomeDay: {
    textAlign: 'center',
    backgroundColor:"#c0392b",
    color:'white',
    fontFamily:'oswald-regular',
    fontSize:18,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  description:{
    fontSize:screenWidth / 11,
    fontFamily:'oswald-regular',
    color:'#c0392b',
    textAlign:'center',
    padding:5,
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialDetail);
