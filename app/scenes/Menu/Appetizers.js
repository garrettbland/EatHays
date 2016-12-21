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
         appetizerDataSource: ds.cloneWithRows(this.props.menu.appetizers.items),
       };
     }
   }

 _renderAppetizer(item) {
   return (
     <View>
       <View style={{flex:1,padding:10,flexDirection:'row',justifyContent:'space-around'}}>
         <View style={{width:screenWidth/1.5,flexDirection:'column'}}>
           <View>
             <Text style={{fontFamily:'oswald-regular',fontSize:screenWidth/20,color:'#000000'}}>
               {item.title}
             </Text>
           </View>
           <View>
             <Text style={{fontSize:screenWidth/28,color:'#7f8c8d'}}>
               {item.description}
             </Text>
           </View>
         </View>
         <View style={{width:screenWidth/4,alignItems:'center',justifyContent:'center'}}>
           <Text style={{fontFamily:'oswald-regular',fontSize:screenWidth/20,color:'#c0392b'}}>
             ${item.price}
           </Text>
         </View>
       </View>
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
     <View style={{flex: 1,backgroundColor:'#ffffff'}}>
       <ScrollView>
         <ListView
           dataSource={this.state.appetizerDataSource}
           enableEmptySections={true}
           renderRow={this._renderAppetizer.bind(this)}
         />
       </ScrollView>
     </View>
   );
 }
 }
}


export default Appetizers;
