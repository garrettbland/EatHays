import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import PhotoView from 'react-native-photo-view';
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
         <Card>
            <Text style={{color:'#c0392b',fontFamily:'oswald-regular',fontSize:15,marginBottom:6}}>
              No Menu yet, coming soon!
            </Text>
          </Card>
       </View>
     );
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
      <View style={{flex: 1,paddingTop:Platform.OS === 'ios'? 64 : 54}}>
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

function mapStateToProps(state){
  return {
    user:state.userReducers.user,
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuDetail);
