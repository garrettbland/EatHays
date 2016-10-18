import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import PhotoView from 'react-native-photo-view';
import { Actions } from 'react-native-router-flux';
import {Button} from 'react-native-elements';
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
         loading:true,
         menuDataSource: ds.cloneWithRows(this.props.menu),
       };


   }


  render() {
    return (
      <View style={styles.container}>
      { this.state.loading &&
        <ActivityIndicator
          size="large"
          color="#3498db"
          style={{paddingTop:4}}
        />
      }
      <ListView
        style={{}}
        dataSource={this.state.menuDataSource}
        renderRow={(data) =>
          <View>
            <PhotoView
              source={{uri: data}}
              minimumZoomScale={0.5}
              maximumZoomScale={3}
              onLoad={() => this.setState({loading:false})}
              style={{width: screenWidth, height: 600}}
            />
          </View>
        }
      />

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
