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

class OwnerPaymentDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const titleStyle = {color:"#c0392b", fontFamily:'oswald-regular', fontSize:18};
    const subtitleStyle = {color:'#95a5a6', fontFamily:'oswald-regular', fontSize:13};
    const list = [
      {
        title: 'Monthly Payment',
        subtitle:"$"+this.props.monthlyCharge,
        icon: 'lock',
        iconColor:'#c0392b',
        fontFamily:'Oswald-bold',
        righticon:'',
      },
      {
        title: 'Monthly Payment Date',
        subtitle:this.props.paymentDate,
        icon: 'group',
        iconColor:'#c0392b',
        fontFamily:'Oswald-bold',
        righticon:'',
      },
      {
        title: 'Payment Details',
        subtitle:this.props.paymentDetails,
        icon: 'group',
        iconColor:'#c0392b',
        fontFamily:'Oswald-bold',
        righticon:'',
      },
    ]
    return (
      <View style={{flex:1,paddingTop:Platform.OS === 'ios'? 64 : 54,backgroundColor:'#e1e8ef'}}>
        <ScrollView>
          <View>
            <Text style={{fontSize: 40,textAlign: 'center',margin: 10,paddingTop:20,paddingBottom:15,fontFamily:'oswald-bold',color:"black"}}>
              Payment Details
            </Text>
          </View>
          <View style={{paddingBottom:15}}>
            <List>
              {
                list.map((item, i) => (
                  <ListItem
                    key={i}
                    titleStyle={titleStyle}
                    title={item.title}
                    subtitle={item.subtitle}
                    subtitleStyle={subtitleStyle}
                    fontFamily="oswald-regular"
                  />
                ))
              }
            </List>
          </View>
        </ScrollView>
      </View>
    );
  }

  _renderItem(item) {
    const titleStyle = {color:"#c0392b", fontFamily:'oswald-regular', fontSize:18};
    const subtitleStyle = {color:'#95a5a6', fontFamily:'oswald-regular', fontSize:13};
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

export default connect(mapStateToProps, mapDispatchToProps)(OwnerPaymentDetails);
