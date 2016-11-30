import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import {List, ListItem} from 'react-native-elements';
import {
  Text,
  View,
  ListView,
  Platform,
  ScrollView,
} from 'react-native';

class OwnerPaymentHistory extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataSource = this.props.paymentHistory;
    var dataSourceReversed = dataSource.reverse();
    this.state = {
     paymentHistoryDataSource: ds.cloneWithRows(dataSourceReversed),
    };
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  render() {
    return (
      <View style={{flex:1,paddingTop:Platform.OS === 'ios'? 64 : 54,backgroundColor:'#e1e8ef'}}>
        <ScrollView>
          <View>
            <Text style={{fontSize: 40,textAlign: 'center',margin: 10,paddingTop:20,paddingBottom:15,fontFamily:'oswald-bold',color:"black"}}>
              Payment History
            </Text>
          </View>
          <View>
            <ListView
              dataSource={this.state.paymentHistoryDataSource}
              renderRow={this._renderItem.bind(this)}
              enableEmptySections={true}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  _renderItem(item) {
    const titleStyle = {color:"#c0392b", fontFamily:'oswald-regular', fontSize:18};
    const subtitleStyle = {color:'#7f8c8d', fontFamily:'oswald-regular', fontSize:13};
    return (
      <View>
        <ListItem
          key={item._key}
          titleStyle={titleStyle}
          title={item.datePaid}
          subtitle={item.amountPaid + " - " + item.description}
          subtitleStyle={subtitleStyle}
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

export default connect(mapStateToProps, mapDispatchToProps)(OwnerPaymentHistory);
