import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import {Button} from 'react-native-elements';
import {
  Text,
  View,
  TouchableOpacity,
  ListView,
  Image,
  Platform,
  ScrollView,
  Dimensions,
  Alert
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const filterOptions = [
'All','American' ,'Asian' ,'Bar & Grill' ,'BBQ' ,'Breakfast' ,'Buffet' ,'Cafe' ,
'Chicken' ,'Chinese' ,'Coffee Shop' ,'Dessert' ,'Fast Food' ,'Italian' ,
'Japanese' ,'Mexican' ,'Night Club' ,'Pizza' ,'Sushi' ,'Vietnamese'
]

class FilterModal extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(filterOptions),
    };
  }

  setFilterValue(value){
    this.props.setFilterValue(value);
    Actions.pop()
  }

  render() {
    return (
      <View style={{flex: 1,paddingTop:15,backgroundColor: '#e1e8ef'}}>
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
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this._renderItem.bind(this)}
            />
      </View>
    );
  }

  _renderItem(item) {
    return(
      <View>
        <TouchableOpacity onPress={() => this.setState({filterValue:item})}>
          <Text>{item}</Text>
        </TouchableOpacity>
      </View>
    )
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
