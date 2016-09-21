import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ListView,
  Image,
} from 'react-native';

const firebaseConfig = {
  databaseURL: "https://eathays-f5100.firebaseio.com/",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

class Favorites extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef().child('placesToEat');
    console.log(this.itemsRef);
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          profile:child.val().profile,
          _key: child.key,
        });
      });

      console.log(items);

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  componentWillMount(){
    Actions.refresh({key: 'drawer', open: value => !value});
  }

  render() {
    return (
      <View style={styles.container}>
      <Icon name="star" style={{fontSize:50,color:"#f1c40f"}}></Icon>
        <Text style={styles.welcome}>
          Favorites
        </Text>
        <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderItem.bind(this)}
            enableEmptySections={true}
        />
      </View>
    );
  }

  _renderItem(item) {

  return (
    <View>
    <Text>{item.title}</Text>
    <Image
      onLoadStart={() => this.setState({loading:true})}
      onLoadEnd={() => this.setState({loading:false})}
      style={{width: 100, height: 100}}
      source={{uri: item.profile}}
    />
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
