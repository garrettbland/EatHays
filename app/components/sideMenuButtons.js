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
  const goToFavorites = () => Actions.Favorites();

  const titleStyle = {color:"#c0392b",fontFamily:"Verdana", fontSize:20};

  const list = [
    {
      title: 'Deals of the Day',
      titleStyle:titleStyle,
      icon: 'thumb-up',
      iconColor:'#c0392b',
      buttonAction:goToIndex,
    },
    {
      title: 'Restaurants',
      titleStyle:titleStyle,
      icon: 'map',
      iconColor:'#c0392b',
      buttonAction:goToDirectory,
    },
    {
      title: 'Favorites',
      titleStyle:titleStyle,
      icon: 'star',
      iconColor:'#c0392b',
      buttonAction:goToFavorites,
    },
    {
      title: 'About',
      titleStyle:titleStyle,
      icon: 'group',
      iconColor:'#c0392b',
      buttonAction:goToAbout,
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
              />
            ))
          }
        </List>
      </View>
    )}
  }
