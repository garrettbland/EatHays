import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import { Actions } from 'react-native-router-flux';
import {Button, Icon} from 'react-native-elements';
import RadioButtons from 'react-native-radio-buttons';
import Emoji from 'react-native-emoji';
import TouchableBounce from 'TouchableBounce';
import {
  Text,
  View,
  ListView,
  Image,
  Platform,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


class FilterModal extends Component {

  constructor(props) {
    super(props);
    if(this.props.user.filter){
      var currentFilter = this.props.user.filter;
      this.state = {
        filterValue:currentFilter,
        currentFilter:currentFilter,
      };
    }
  }

  setFilterValue(value){
    if(!value){
      Actions.pop()
    }else if (value == this.state.currentFilter){
      Actions.pop()
    }else{
      this.props.setFilterValue(value);
    }
    Actions.pop()
  }

  render() {

    const options = [
    'All','Local Eats Only','Delivery','Wifi Access','American' ,'Asian' ,'Bar & Grill' ,'BBQ' ,'Breakfast' ,'Buffet' ,'Cafe' ,
    'Chicken' ,'Chinese' ,'Coffee Shop' ,'Dessert' ,'Fast Food' ,'Italian' ,
    'Japanese' ,'Mexican' ,'Night Club' ,'Pizza' ,'Sushi' ,'Vietnamese'
    ]

    function setSelectedOption(selectedOption){
      this.setState({
        filterValue:selectedOption
      })
    }

    function renderOption(option, selected, onSelect, index){
      const style = selected ? { fontFamily:'oswald-bold',color: '#c0392b',fontSize:screenWidth/8} : {fontFamily:'oswald-bold',color: '#7f8c8d',fontSize:screenWidth/8};
      if(option == "Local Eats Only"){
          return (
            <TouchableBounce onPress={onSelect} key={index}>
              <View style={{alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                <View>
                  <Icon
                    size={40}
                    name='cutlery'
                    type='font-awesome'
                    color='#c0392b'
                  />
                </View>
                <View>
                  <Text style={selected ? { fontFamily:'oswald-bold',color: '#000000',fontSize:screenWidth/8} : {fontFamily:'oswald-bold',color: '#7f8c8d',fontSize:screenWidth/8}}> {option}</Text>
                </View>
              </View>
            </TouchableBounce>
          );
      }else if(option == "Delivery"){
          return (
            <TouchableBounce onPress={onSelect} key={index}>
              <View style={{alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                <View>
                  <Icon
                    size={40}
                    name='car'
                    type='font-awesome'
                    color='#F9690E'
                  />
                </View>
                <View>
                  <Text style={selected ? { fontFamily:'oswald-bold',color: '#F9690E',fontSize:screenWidth/8} : {fontFamily:'oswald-bold',color: '#7f8c8d',fontSize:screenWidth/8}}> {option}</Text>
                </View>
              </View>
            </TouchableBounce>
          );
      }else if(option == "Wifi Access"){
          return (
            <TouchableBounce onPress={onSelect} key={index}>
              <View style={{alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                <View>
                  <Icon
                    size={40}
                    name='wifi'
                    type='font-awesome'
                    color='#3498db'
                  />
                </View>
                <View>
                  <Text style={selected ? { fontFamily:'oswald-bold',color: '#3498db',fontSize:screenWidth/8} : {fontFamily:'oswald-bold',color: '#7f8c8d',fontSize:screenWidth/8}}> {option}</Text>
                </View>
              </View>
            </TouchableBounce>
          );
      }else {
        return (
          <TouchableBounce onPress={onSelect} key={index}>
            <View style={{alignItems:'center',justifyContent:'center'}}>
            <Text style={style}>{option}</Text>
            </View>
          </TouchableBounce>
        );
      }
    }

    function renderContainer(optionNodes){
      return <View>{optionNodes}</View>;
    }

    return (
      <View style={{flex: 1,paddingTop:20,backgroundColor: '#e1e8ef'}} >
          <View style={{flexDirection:'row',marginTop:15,marginBottom:15}}>
            <View style={{width:screenWidth/2}}>
              <Button
                raised
                small
                iconRight
                borderRadius={5}
                icon={{name: 'cancel'}}
                fontFamily="oswald-bold"
                fontSize={14}
                buttonStyle={{marginBottom:5,}}
                backgroundColor="#c0392b"
                title="Cancel"
                onPress={() => Actions.pop()}
              />
            </View>
            <View style={{width:screenWidth/2}}>
              <Button
                raised
                small
                iconRight
                borderRadius={5}
                icon={{name: 'check'}}
                fontFamily="oswald-bold"
                fontSize={14}
                buttonStyle={{marginBottom:5,}}
                backgroundColor="#27ae60"
                title="Accept"
                onPress={() => this.setFilterValue(this.state.filterValue)}
              />
            </View>
          </View>
          <ScrollView>
          <View>
            <RadioButtons
              options={ options }
              onSelection={ setSelectedOption.bind(this) }
              selectedOption={this.state.filterValue }
              renderOption={ renderOption }
              renderContainer={ renderContainer }
            />
          </View>
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);
