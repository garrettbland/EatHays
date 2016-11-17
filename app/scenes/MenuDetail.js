import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import PhotoView from 'react-native-photo-view';
import { Actions } from 'react-native-router-flux';
import {Button, Card} from 'react-native-elements';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  WebView,
  Platform,
  ActivityIndicator,
  Image,
  Dimensions,
  ListView,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class MenuDetail extends Component {

  constructor(props) {
     super(props);
     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

       this.state = {
         loading:false,
         menuDataSource: ds.cloneWithRows(this.props.menu),
       };


   }

   _renderItem(item) {
     if (item == "null"){
       return (
         <View>
         <Card
            >
            <Text style={{color:'#c0392b',fontFamily:'oswald-regular',fontSize:15,marginBottom:6}}>
            No Menu yet, coming soon!
            </Text>
          </Card>
         </View>
       )
     }else{
           return (
             <View>
               <PhotoView
                 source={{uri: item}}
                 minimumZoomScale={0.5}
                 maximumZoomScale={3}
                 onLoad={() => this.setState({loading:false})}
                 onLoadStart={()=>this.setState({loading:true})}
                 style={{width: screenWidth, height: 600}}
               />
             </View>
           );
         }
       }


  render() {
    return (
      <View style={styles.container}>
      <ListView
        style={{}}
        dataSource={this.state.menuDataSource}
        enableEmptySections={true}
        renderRow={this._renderItem.bind(this)}
      />
      { this.state.loading &&
        <ActivityIndicator
          size="large"
          color="#3498db"
          style={{paddingTop:4}}
        />
      }
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:Platform.OS === 'ios'? 64 : 54,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

function mapStateToProps(state){
  return {
    user:state.userReducers.user,
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuDetail);
