import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions';
import { List, ListItem} from 'react-native-elements';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';


  const goToIndex = () => Actions.Home();
  const goToDirectory = () => Actions.Directory();
  const goToAbout = () => Actions.About();

  const titleStyle = {color:"#c0392b",fontFamily:"Verdana", fontSize:20};

  const list = [
    {
      title: 'Deals of the Day',
      titleStyle:titleStyle,
      icon: 'thumb-up',
      iconColor:'#c0392b',
      buttonAction:goToIndex,
      fontFamily:"Verdana",
    },
    {
      title: 'Restaurants',
      titleStyle:titleStyle,
      icon: 'map',
      iconColor:'#c0392b',
      buttonAction:goToDirectory,
      fontFamily:'Times',
    },
    {
      title: 'About',
      titleStyle:titleStyle,
      icon: 'group',
      iconColor:'#c0392b',
      buttonAction:goToAbout,
      fontFamily:'Oswald-bold',
    },
  ]

export default class extends Component {

  render() {
    return (
      <View>
        <List>
          {
            list.map((item, i) => (
              <ListItem
                key={i}
                titleStyle={item.titleStyle}
                onPress={item.buttonAction}
                title={item.title}
                hideChevron={true}
                icon={{name: item.icon, color:item.iconColor}}
                fontFamily="oswald-regular"
              />
            ))
          }
        </List>
      </View>
    )}
  }
