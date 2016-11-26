import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { Button, FormLabel, FormInput } from 'react-native-elements'
import firebaseApp from "../components/firebaseconfig.js";
import moment from 'moment';
var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;
import StarRating from 'react-native-star-rating';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Platform,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

class ReviewDetail extends Component {

  componentDidMount(){
    MessageBarManager.registerMessageBar(this.refs.alert);

    if (this.props.fromDirectory == true){
      this.setState({
        restaurantTitle:this.props.restaurantTitle,
        specialHashTag:"",
        special:"",
        phoneNumber:"",
        restaurant:this.props.restaurantTitle,
        fromSpecial:true,
      });
    }else if(this.props.fromSpecial == true){
      this.setState({
        restaurantTitle:this.props.restaurantTitle,
        specialHashTag:"",
        special:this.props.specialHashTag,
        restaurant:this.props.restaurantTitle,
        fromSpecial:true,
      });
    }else{
      this.setState({
        restaurantTitle:"",
        fromSpecial:false,
        specialHashTag:"",
        special:"",
        phoneNumber:"",
      });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      starCount: 2.5,
      restaurantTitle:"",
      name:"",
      restaurant:"",
      review:"",
      phoneNumber:"",
      loading:false,
      firsReview:true
    };
    this.itemsRef = this.getRef().child('reviews');
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  submitReview(){
    var dateSubmitted = moment().format('LL h:mm A');
    var stopLoading = ()=>this.setState({loading:false,firstReview:false});
    var onComplete = function(error) {
       if (error) {
         Alert.alert("Error","Looks like something went wrong, please try again.");
       } else {
         Alert.alert("Success!","You review has been submitted. Thank you!");
         this.setState({loading:false});
         Actions.pop();
       }
     }.bind(this);

    if (this.state.name == "" || this.state.restaurant == "" || this.state.review == ""){
      MessageBarManager.showAlert({
       viewTopOffset : Platform.OS === 'ios'? 64 : 54,
       duration:8000,
       title: 'Uh-oh',
       message: 'Please make sure all fields are completed before submitting',
       alertType: 'warning',
       animationType:'SlideFromLeft',
       position: 'top',
       titleStyle: {fontFamily:'oswald-regular',color:'#FFFFFF',fontSize:20},
       stylesheetSuccess: { backgroundColor: '#e67e22', strokeColor:'#e67e22' }
     });
    }else{
      this.itemsRef.push({
        name: this.state.name,
        restaurant: this.state.restaurant,
        special: this.state.special,
        review: this.state.review,
        phoneNumber: this.state.phoneNumber,
        timestamp: dateSubmitted,
        rate: this.state.starCount
      },(onComplete));

      this.setState({
        loading:true,
        name:"",
        restaurant:"",
        review:"",
        restaurantTitle:"",
        specialHashTag:"",
        phoneNumber:"",
      });
    }
  }

  componentWillUnmount() {
    MessageBarManager.unregisterMessageBar();
  }

  render() {
    return (
      <View style={{flex: 1,paddingTop:Platform.OS === 'ios'? 64 : 54}}>
        <ScrollView>
          <View>
            <View style={{marginLeft:15,marginRight:15,marginTop:15}}>
              <View>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={this.state.starCount}
                  starColor={'#FFD700'}
                  emptyStarColor={'#bdc3c7'}
                  selectedStar={(rating) => this.onStarRatingPress(rating)}
                />
              </View>
            </View>
            <FormLabel labelStyle={{fontFamily:'oswald-bold',color:"#c0392b"}}>Name</FormLabel>
            <FormInput placeholder="Your name" value={this.state.name} onChangeText={(text) => this.setState({name:text})}/>
            <FormLabel labelStyle={{fontFamily:'oswald-bold',color:"#c0392b"}}>Restaurant</FormLabel>
            {this.state.fromSpecial &&
              <FormInput placeholder="Where did you eat at?" editable={false} value={this.state.restaurantTitle  + this.state.specialHashTag} onChangeText={() => console.log("TEST")}/>
            }
            {!this.state.fromSpecial &&
              <FormInput placeholder="Where did you eat at?" value={this.state.restaurant} onChangeText={(text) => this.setState({restaurant:text})}/>
            }
            <FormLabel labelStyle={{fontFamily:'oswald-bold',color:"#c0392b"}}>Review</FormLabel>
            <View style={{marginBottom:20}}>
              <FormInput
                value={this.state.review}
                 multiline = {true}
                 placeholder="Share your thoughts and opinions"
                 onChangeText={(text) => this.setState({review:text})}
              />
              <FormLabel labelStyle={{fontFamily:'oswald-bold',color:"#c0392b"}}>Phone Number (not required)</FormLabel>
              <FormInput
                value={this.state.phoneNumber}
                 placeholder="Enter your number for a chance to win prizes!"
                 onChangeText={(text) => this.setState({phoneNumber:text})}
              />
            </View>
            <Button
              raised
              borderRadius={5}
              fontFamily='oswald-bold'
              icon={{name: 'mail'}}
              title='Submit Review'
              backgroundColor="#3498db"
              onPress={() => this.submitReview()}
            />
          </View>
          {this.state.loading &&
            <ActivityIndicator
              size="large"
              color="#3498db"
              style={{marginTop:15}}
            />
          }
        </ScrollView>
        <MessageBarAlert ref="alert" />
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

export default connect(mapStateToProps, mapDispatchToProps)(ReviewDetail);
