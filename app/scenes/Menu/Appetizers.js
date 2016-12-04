import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from 'react-native-elements';
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

class Appetizers extends Component {

  constructor(props) {
     super(props);
     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     if(this.props.menu.sides.active === true){
       this.state = {
         appetizerDataSource: ds.cloneWithRows(this.props.menu.appetizers.list),
       };
     }
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
   if(this.props.menu.sides.active === false){
     var randomWord = shuffle(funWords);
     return (
       <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#e1e8ef'}}>
         <View>
           <Icon name="meh-o" style={{fontSize:50, color:"#c0392b"}}/>
         </View>
         <View>
           <Text style={{fontFamily:'oswald-bold',color:'#7f8c8d'}}>{randomWord[0]}. Currently no Appetizers.</Text>
         </View>
       </View>
     )
   }else{
   return (
     <View style={{flex: 1,paddingTop:Platform.OS === 'ios'? 64 : 54,backgroundColor:'#e1e8ef'}}>
       <ScrollView>
         <ListView
           dataSource={this.state.appetizerDataSource}
           enableEmptySections={true}
           renderRow={this._renderAppetizer.bind(this)}
           initialListSize={5}
         />
            <Text>Ative: </Text>
       </ScrollView>
     </View>
   );
 }
 }
}


export default Appetizers;
