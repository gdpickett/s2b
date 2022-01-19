import '../styles/globals.css'
import { wrapper } from '../redux/store';
import React from 'react';

const MyApp = ({Component, pageProps}) => (
    <Component {...pageProps} />
  );

export default wrapper.withRedux(MyApp);
