import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import SideMenu from '../scenes/SideMenu.js';
import {Actions, DefaultRenderer} from 'react-native-router-flux';

export default class extends Component {
    render(){
        const state = this.props.navigationState;
        const children = state.children;
        return (
            <Drawer
                ref="navigation"
                open={state.open}
                onOpen={()=>Actions.refresh({key:state.key, open: true})}
                onClose={()=>Actions.refresh({key:state.key, open: false})}
                type="overlay"
                content={<SideMenu />}
                tapToClose={true}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                negotiatePan={true}
                acceptPan={true}
                tweenDuration={200}
            >
                <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
            </Drawer>
        );
    }
}
