import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import { Card } from 'react-native-elements';
import shuffle from 'shuffle-array';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Text,
  View,
  Platform,
  ActivityIndicator,
  Image,
  Dimensions,
  ListView,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const funWords = ['Drat','Shucks','Dang','Cripes','Gosh-Darn','Nuts','Kod-Swallop','Nonsense','Tarnation'];

class Coupons extends Component {
  constructor(props) {
     super(props);
     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     if(this.props.coupons.active === true){
       this.state = {
         couponDataSource: ds.cloneWithRows(this.props.coupons.items),
       };
     }
   }

  _renderItem(item) {
     return (
       <View>
         <Card image={{uri:item.image}}>
           <View style={{flexDirection:'row'}}>
             <View style={{alignItems:'flex-start', flex:4, justifyContent:'center'}}>
               <Text style={{fontFamily:'oswald-bold',fontSize:screenWidth/18,color:'#000000'}}>{item.title}</Text>
               <Text style={{fontSize:screenWidth/30,color:'#7f8c8d'}}>{item.description}</Text>
             </View>
           </View>
         </Card>
       </View>
     );
 }

  render() {
    if(this.props.coupons.active === false){
      var randomWord = shuffle(funWords);
      return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#e1e8ef'}}>
          <View>
            <Icon name="meh-o" style={{fontSize:50, color:"#c0392b"}}/>
          </View>
          <View>
            <Text style={{fontFamily:'oswald-bold',color:'#7f8c8d'}}>{randomWord[0]}. Currently no Coupons</Text>
          </View>
        </View>
      )
    }else if(this.props.coupons.active === true){
      return (
        <View style={{flex: 1,paddingTop:Platform.OS === 'ios'? 64 : 54,backgroundColor:'#e1e8ef'}}>
          <ListView
            style={{}}
            dataSource={this.state.couponDataSource}
            enableEmptySections={true}
            renderRow={this._renderItem.bind(this)}
          />
        </View>
      );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Coupons);
