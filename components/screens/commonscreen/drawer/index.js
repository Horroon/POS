import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Drawer from 'react-native-drawer';

function HOC(Page, Sidebar) {
  return class DrawerClass extends Component {
    constructor(props) {
      super(props);
    }

    closeControlPanel = () => {
      this._drawer.close();
    };
    openControlPanel = () => {
      this._drawer.open();
    };
    render() {
      console.log(
        'this.props.navigations in drawer hoc',
        this.props.navigations,
      );
      return (
        <Drawer
          ref={ref => (this._drawer = ref)}
          content={<Sidebar {...this.props} />}
          styles={drawerStyles}
          type="overlay"
          tapToClose={true}
          openDrawerOffset={0.2} // 20% gap on the right side of drawer
          panCloseMask={0.2}
          closedDrawerOffset={-3}
          panThreshold={0.25}>
          <Page
            closeControlPanel={this.closeControlPanel}
            openControlPanel={this.openControlPanel}
            {...this.props}
          />
        </Drawer>
      );
    }
  };
}

export default HOC;

const drawerStyles = StyleSheet.create({
  drawer: {
    shadowColor: 'gray',
    shadowOpacity: 0.8,
    shadowRadius: 3,
    backgroundColor: 'gray',
  },
  main: {paddingLeft: 3},
});
