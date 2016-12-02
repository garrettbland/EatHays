import React, { Component } from 'react';

import { Card } from 'react-native-elements';
import {
  Text,
  View,
  Platform,
  ActivityIndicator,
  Image,
  Dimensions,
  ListView,
  ScrollView,
  Alert,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class MenuDetail extends Component {

  constructor(props) {
     super(props);
     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     this.state = {
       appetizerDataSource: ds.cloneWithRows(this.props.menu.appetizers.list),
     };
   }

 _renderAppetizer(item) {
      return (
        <View>
          <View style={{flexDirection:'row'}}>
            <Text style={{color:'#c0392b',fontFamily:'oswald-regular',fontSize:15,marginBottom:6}}>
              {item.title}
            </Text>
            <Text style={{color:'#000000',fontFamily:'oswald-regular',fontSize:15,marginBottom:6}}>
              ........{item.price}
            </Text>
          </View>
            <Text style={{color:'#010101',fontFamily:'oswald-regular',fontSize:10,marginBottom:6}}>
              {item.description}
            </Text>
        </View>
      );
 }

  render() {
    return (
      <View style={{flex: 1,paddingTop:Platform.OS === 'ios'? 64 : 54,backgroundColor:'#e1e8ef'}}>
        <ScrollView>
          <Text>Appetizers</Text>
          <ListView
            dataSource={this.state.appetizerDataSource}
            enableEmptySections={true}
            renderRow={this._renderAppetizer.bind(this)}
            initialListSize={5}
          />
        </ScrollView>
      </View>
    );
  }
}


export default MenuDetail;
