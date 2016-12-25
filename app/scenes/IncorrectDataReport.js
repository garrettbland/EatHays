import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { Button, FormLabel, FormInput } from 'react-native-elements'
import firebaseApp from "../components/firebaseconfig.js";
import moment from 'moment';
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
      restaurant:"",
      review:"",
      loading:false,
    };


    this.itemsRef = this.getRef().child('incorrectDataReport');
  }


  getRef() {
    return firebaseApp.database().ref();
  }

  submitReport(){
    var dateSubmitted = moment().format('LL h:mm A');
    var stopLoading = ()=>this.setState({loading:false});
    var onComplete = function(error) {
       if (error) {
         Alert.alert("Error","Looks like something went wrong, please try again.");
       } else {
         Alert.alert("Success","You report has been submitted. We appreciate you taking the time to report this.");
         this.setState({loading:false});
         Actions.pop();
       }
     }.bind(this);

    if (this.state.restaurant == "" || this.state.review == ""){
      Alert.alert("Error","Please make sure required fields are complete before submitting.")
    }else{
      this.itemsRef.push({
        restaurant: this.state.restaurant,
        report: this.state.review,
        timestamp: dateSubmitted,
      },(onComplete));

      this.setState({
        loading:true,
        restaurant:"",
        review:"",
      });
    }
  }


  render() {
    return (
      <View style={{flex: 1,paddingTop:Platform.OS === 'ios'? 64 : 54}}>
        <KeyboardAwareScrollView>
        <View>
          <Text style={{fontSize: 30,textAlign: 'center',margin: 10,paddingTop:20,paddingBottom:15,fontFamily:'oswald-bold',color:"black"}}>
            Report Incorrect Data
          </Text>
        </View>
          <View>
              <View style={{marginLeft:15,marginRight:15}}>
                <Sae
                  label={'RESTAURANT'}
                  labelStyle={{color:'#c0392b', fontFamily:'oswald-regular'}}
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
            <View style={{marginLeft:15,marginRight:15,marginBottom:15}}>
              <Sae
                label={'INCORRECT DATA'}
                labelStyle={{color:'#c0392b', fontFamily:'oswald-regular'}}
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
            <View>
              <Button
                raised
                borderRadius={5}
                fontFamily='oswald-bold'
                icon={{name: 'mail'}}
                title='Submit Report'
                backgroundColor="#3498db"
                onPress={() => this.submitReport()}
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
