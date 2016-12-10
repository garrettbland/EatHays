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
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Platform,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

class ReviewDetail extends Component {

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

  componentDidMount(){
    MessageBarManager.registerMessageBar(this.refs.alert);

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
        <KeyboardAwareScrollView>
          <View>
            <View style={{marginLeft:15,marginRight:15,marginTop:15,marginBottom:15}}>
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
            <View style={{marginLeft:15,marginRight:15}}>
              <Sae
                label={'YOUR NAME'}
                labelStyle={{color:'#c0392b', fontFamily:'oswald-bold'}}
                iconClass={FontAwesomeIcon}
                iconName={'pencil'}
                iconColor={'#c0392b'}
                // TextInput props
                autoCapitalize={'none'}
                inputStyle={{color:'#000000'}}
                autoCorrect={false}
                onChangeText={(text) => this.setState({name:text})}
                value={this.state.name}
              />
            </View>
            <View style={{marginLeft:15,marginRight:15}}>
              <Sae
                label={'RESTAURANT'}
                labelStyle={{color:'#c0392b', fontFamily:'oswald-bold'}}
                iconClass={FontAwesomeIcon}
                iconName={'pencil'}
                iconColor={'#c0392b'}
                // TextInput props
                autoCapitalize={'none'}
                inputStyle={{color:'#000000'}}
                autoCorrect={false}
                onChangeText={(text) => this.setState({restaurant:text})}
                value={this.state.restaurant}
              />
            </View>

            <View style={{marginLeft:15,marginRight:15}}>
              <Sae
                label={'YOUR REVIEW'}
                labelStyle={{color:'#c0392b', fontFamily:'oswald-bold'}}
                iconClass={FontAwesomeIcon}
                iconName={'pencil'}
                iconColor={'#c0392b'}
                // TextInput props
                autoCapitalize={'none'}
                inputStyle={{color:'#000000'}}
                autoCorrect={false}
                onChangeText={(text) => this.setState({review:text})}
                value={this.state.review}
              />
            </View>
            <View style={{marginLeft:15,marginRight:15,marginBottom:30}}>
              <Sae
                label={'PHONE # (not required)'}
                labelStyle={{color:'#c0392b', fontFamily:'oswald-bold'}}
                iconClass={FontAwesomeIcon}
                iconName={'pencil'}
                iconColor={'#c0392b'}
                // TextInput props
                autoCapitalize={'none'}
                inputStyle={{color:'#000000'}}
                autoCorrect={false}
                onChangeText={(text) => this.setState({phoneNumber:text})}
                value={this.state.phoneNumber}
              />
            </View>
            <View>
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
          </View>
          <View>
            {this.state.loading &&
              <ActivityIndicator
                size="large"
                color="#3498db"
                style={{marginTop:15}}
              />
            }
          </View>
        </KeyboardAwareScrollView>
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
