import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from '../actions/';
import { Card } from 'react-native-elements';
import firebaseApp from "../components/firebaseconfig.js";
import StarRating from 'react-native-star-rating';
import {
  Text,
  View,
  ListView,
  Platform,
  ScrollView,
} from 'react-native';

class ReviewFullList extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataSource = this.props.reviews;
    var dataSourceReversed = dataSource.reverse();
    this.state = {
     reviewsDataSource: ds.cloneWithRows(dataSourceReversed),
    };
  }

  render() {
    return (
      <View style={{paddingTop:Platform.OS === 'ios'? 64 : 54,backgroundColor:'#e1e8ef',flex:1}}>
        <ScrollView>
          <View>
            <Text style={{fontSize: 40,textAlign: 'center',margin: 10,paddingTop:20,paddingBottom:15,fontFamily:'oswald-bold',color:"black"}}>
              {this.props.restaurantTitle} Reviews
            </Text>
          </View>
          <View style={{paddingBottom:15}}>
            <ListView
              dataSource={this.state.reviewsDataSource}
              renderRow={this._renderItem.bind(this)}
              enableEmptySections={true}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  _renderItem(item) {
    if (item.review == "null"){
      return (
        <View >
          <Card>
            <View style={{width:50}}>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={item.rate}
                starColor={'#FFD700'}
                emptyStarColor={'#bdc3c7'}
                starSize={20}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
              />
            </View>
            <View>
              <Text style={{color:'#c0392b',fontFamily:'oswald-regular',fontSize:15,marginBottom:6}}>
                  No Reviews yet, be the first!
              </Text>
            </View>
            <View>
              <Text style={{fontStyle:'italic',color:'#7f8c8d',fontSize:13}}>
                  No sign up required
              </Text>
            </View>
           </Card>
        </View>
      );
    }else{
      return (
        <View>
          <Card >
            <View style={{width:50}}>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={item.rate}
                starColor={'#FFD700'}
                emptyStarColor={'#bdc3c7'}
                starSize={20}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
              />
            </View>
            <Text style={{color:'#000000',fontSize:15,marginBottom:15}}>
              {item.review}
            </Text>
            <Text style={{fontStyle:'italic',color:'#c0392b',fontSize:13}}>
              {item.name} on {item.date}
            </Text>
          </Card>
        </View>
      );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ReviewFullList);
