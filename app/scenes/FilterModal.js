import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import {Button} from 'react-native-elements';
import RadioButtons from 'react-native-radio-buttons';
import {
  Text,
  View,
  ListView,
  Image,
  Platform,
  ScrollView,
  Dimensions,
  Alert,
  TouchableOpacity,
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
    'All','American' ,'Asian' ,'Bar & Grill' ,'BBQ' ,'Breakfast' ,'Buffet' ,'Cafe' ,
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

      return (
        <TouchableOpacity onPress={onSelect} key={index}>
          <View style={{alignItems:'center',justifyContent:'center'}}>
          <Text style={style}>{option}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    function renderContainer(optionNodes){
      return <View>{optionNodes}</View>;
    }

    return (
      <View style={{flex: 1,paddingTop:0,backgroundColor: '#e1e8ef'}} >
        <ScrollView>
          <Text style={{fontSize: 40,textAlign: 'center',paddingTop:20,fontFamily:'oswald-bold',color:"black"}}>
            Filter
          </Text>
          <Text style={{textAlign: 'center',fontFamily:'oswald-regular',color:'#95a5a6'}}>
            Filter restaurants by category
          </Text>
          <View style={{flexDirection:'row',marginTop:15,marginBottom:15}}>
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
          </View>
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
