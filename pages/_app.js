import '../styles/globals.css'
import { wrapper } from '../redux/store';
import React from 'react';

class MyApp extends React.Component {
  render() {
    const {Component, pageProps} = this.props;
    return <Component {...pageProps} />;
  }
}

export default wrapper.withRedux(MyApp);
