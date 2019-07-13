import React, { Component } from 'react';;
import { Provider, connect } from 'react-redux';
import { createReduxContainer } from 'react-navigation-redux-helpers';

import RootNavigation from './src/navigations/Router';
import { store } from './src/redux/store';
import { MenuProvider } from 'react-native-popup-menu';

const AppNav = createReduxContainer(RootNavigation, 'root');

const mapStateToProps = state => ({
  state: state.router
});

const AppWithNavigationState = connect(mapStateToProps)(AppNav);

export default class App extends Component {
  render() {
    return (
      <MenuProvider>
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
      </MenuProvider>
    );
  }
}

