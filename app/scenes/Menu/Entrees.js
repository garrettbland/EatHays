import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import shuffle from 'shuffle-array';
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
const funWords = ['Drat','Shucks','Dang','Cripes','Gosh-Darn','Nuts','Kod-Swallop','Nonsense','Tarnation'];

class Entrees extends Component {

  constructor(props) {
     super(props);
     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     if(this.props.menu.entrees.active === true){
       this.state = {
         entreesDataSource: ds.cloneWithRows(this.props.menu.entrees.list),
       };
     }
   }

 _renderEntree(item) {
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
    if(this.props.menu.entrees.active === false){
      var randomWord = shuffle(funWords);
      return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#e1e8ef'}}>
          <View>
            <Icon name="meh-o" style={{fontSize:50, color:"#c0392b"}}/>
          </View>
          <View>
            <Text style={{fontFamily:'oswald-bold',color:'#7f8c8d'}}>{randomWord[0]}. No active Entrees</Text>
          </View>
        </View>
      )
    }else{
    return (
      <View style={{flex: 1,paddingTop:Platform.OS === 'ios'? 64 : 54,backgroundColor:'#e1e8ef'}}>
        <ScrollView>
          <ListView
            dataSource={this.state.entreesDataSource}
            enableEmptySections={true}
            renderRow={this._renderEntree.bind(this)}
            initialListSize={5}
          />
        </ScrollView>
      </View>
    );
  }
  }
}


export default Entrees;
