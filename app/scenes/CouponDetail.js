import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import { Card } from 'react-native-elements';
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

class Coupons extends Component {

  constructor(props) {
     super(props);
     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     this.state = {
       couponDataSource: ds.cloneWithRows(this.props.coupons),
     };
   }

 _renderItem(item) {
   if(item.active === false){
     return(
       <View></View>
     );
   }else if(item.active === true){
     return (
       <View>
         <Card image={{uri:item.image}}>
           <View style={{flexDirection:'row'}}>
             <View style={{alignItems:'flex-start', flex:4, justifyContent:'center'}}>
               <Text style={{fontFamily:'oswald-bold',fontSize:screenWidth/18,color:'#000000'}}>{item.title}</Text>
             </View>
           </View>
         </Card>
       </View>
     );
   }
 }

  render() {
    return (
      <View style={{flex: 1,paddingTop:Platform.OS === 'ios'? 64 : 54}}>
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

function mapStateToProps(state){
  return {
    user:state.userReducers.user,
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Coupons);
