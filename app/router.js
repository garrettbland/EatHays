import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReduxActions from './actions';
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions, Scene, Router, Modal} from 'react-native-router-flux';
import {
  Text
} from 'react-native';
import Drawer from './components/drawer.js';
import Home from './scenes/Home.js';
import SpecialDetail from './scenes/SpecialDetail.js';
import Directory from './scenes/Directory.js';
import Review from './scenes/Review.js';
import ReviewDetail from './scenes/ReviewDetail.js';
import About from './scenes/About.js';
import Contact from './scenes/Contact.js';
import DirectoryDetail from './scenes/DirectoryDetail.js';
import MapDetail from './scenes/MapDetail.js';
import MenuIndex from './scenes/Menu/MenuIndex.js';
import ReviewFullList from './scenes/ReviewFullList.js';
import OwnerLogin from './scenes/OwnerLogin.js';
import OwnerAccount from './scenes/OwnerAccount.js';
import OwnerPaymentHistory from './scenes/OwnerPaymentHistory.js';
import OwnerPaymentDetails from './scenes/OwnerPaymentDetails.js';
import CouponDetail from './scenes/CouponDetail.js';
import OwnerStats from './scenes/OwnerStats.js';
import FilterModal from './scenes/FilterModal.js';

const styleNavigationBarStyle = {backgroundColor:"#c0392b",borderBottomColor:Platform.OS === 'ios'? "#c0392b" : "#b03427",borderBottomWidth:4,shadowColor: '#000000', shadowOpacity: 0.9, shadowRadius: 10,};
const styleTitleStyle = {color:"#FFFFFF",fontFamily:'oswald-regular',fontSize:20};

const toggleDrawer = () => Actions.refresh({key: 'drawer', open: value => !value });
const toggleFilter = () => Actions.FilterModal()

const settingsIcon = (<Icon name="bars" size={30} color="#FFFFFF" />);
const filterIcon = (<Icon name="sliders" size={30} color="#FFFFFF" />);
const backButtonIcon = (<Icon name="chevron-left" size={23} color="#FFFFFF" />);
const searchIcon = (<Icon name="search" size={25} color="#FFFFFF" />);

class EatHaysRouter extends Component {
  render() {
    return (
      <Router>
          <Scene key="drawer" component={Drawer} open={false} >
              <Scene key="root">
                <Scene key="Home" navigationBarStyle={styleNavigationBarStyle} titleStyle={styleTitleStyle} component={Home} type="replace" initial={true} leftTitle={settingsIcon} onLeft={toggleDrawer} title="Eat Hays"/>
                <Scene key="SpecialDetail" navigationBarStyle={styleNavigationBarStyle} titleStyle={styleTitleStyle} backTitle={backButtonIcon} hideBackImage={true} component={SpecialDetail} type="push" title="Deal of the Day" />
                <Scene key="Directory" navigationBarStyle={styleNavigationBarStyle} titleStyle={styleTitleStyle} component={Directory} type="replace" leftTitle={settingsIcon} onLeft={toggleDrawer} rightTitle={filterIcon} onRight={toggleFilter} title="Directory" />
                <Scene key="MapDetail" navigationBarStyle={styleNavigationBarStyle} titleStyle={styleTitleStyle} backTitle={backButtonIcon} hideBackImage={true} component={MapDetail} type="push" title="Directions" />
                <Scene key="CouponDetail" navigationBarStyle={styleNavigationBarStyle} titleStyle={styleTitleStyle} backTitle={backButtonIcon} hideBackImage={true} component={CouponDetail} type="push" title="Coupons" />
                <Scene key="Review" navigationBarStyle={styleNavigationBarStyle} titleStyle={styleTitleStyle} component={Review} type="replace" leftTitle={settingsIcon} onLeft={toggleDrawer} title="Write a Review" />
                <Scene key="ReviewDetail" navigationBarStyle={styleNavigationBarStyle} titleStyle={styleTitleStyle} backTitle={backButtonIcon} hideBackImage={true} component={ReviewDetail} type="push" title="Your Thoughts" />
                <Scene key="ReviewFullList" navigationBarStyle={styleNavigationBarStyle} titleStyle={styleTitleStyle} backTitle={backButtonIcon} hideBackImage={true} component={ReviewFullList} type="push" title="All Reviews" />
                <Scene key="DirectoryDetail" navigationBarStyle={styleNavigationBarStyle} titleStyle={styleTitleStyle} backTitle={backButtonIcon} hideBackImage={true} component={DirectoryDetail} type="push" title="Directory Detail" />
                <Scene key="OwnerLogin" navigationBarStyle={styleNavigationBarStyle} titleStyle={styleTitleStyle} component={OwnerLogin} type="replace" leftTitle={settingsIcon} onLeft={toggleDrawer} title="Owner Login" />
                <Scene key="OwnerAccount" navigationBarStyle={styleNavigationBarStyle} titleStyle={styleTitleStyle} component={OwnerAccount} type="replace" leftTitle={settingsIcon} onLeft={toggleDrawer} title="Account" />
                <Scene key="OwnerPaymentDetails" navigationBarStyle={styleNavigationBarStyle} titleStyle={styleTitleStyle} backTitle={backButtonIcon} hideBackImage={true} component={OwnerPaymentDetails} type="push" title="Payment Details" />
                <Scene key="OwnerPaymentHistory" navigationBarStyle={styleNavigationBarStyle} titleStyle={styleTitleStyle} backTitle={backButtonIcon} hideBackImage={true} component={OwnerPaymentHistory} type="push" title="Payment History" />
                <Scene key="OwnerStats" navigationBarStyle={styleNavigationBarStyle} titleStyle={styleTitleStyle} backTitle={backButtonIcon} hideBackImage={true} component={OwnerStats} type="push" title="Statistics" />
                <Scene key="About" navigationBarStyle={styleNavigationBarStyle} titleStyle={styleTitleStyle} component={About} type="replace" leftTitle={settingsIcon} onLeft={toggleDrawer} title="About" />
                <Scene key="Contact" navigationBarStyle={styleNavigationBarStyle} titleStyle={styleTitleStyle} backTitle={backButtonIcon} hideBackImage={true} component={Contact} type="push" title="Contact" />
                <Scene key="MenuIndex" navigationBarStyle={styleNavigationBarStyle} titleStyle={styleTitleStyle} backTitle={backButtonIcon} hideBackImage={true} component={MenuIndex} type="push" title="Menu" />
              </Scene>
          </Scene>
          <Scene key="FilterModal" component={FilterModal} direction="vertical" hideNavBar={true}/>
      </Router>
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

export default connect(mapStateToProps, mapDispatchToProps)(EatHaysRouter);
