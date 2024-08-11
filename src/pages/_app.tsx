/* eslint-disable react/jsx-props-no-spreading */
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import '../styles/globals.css'; // Import global styles here
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  console.log('MyApp', { ...pageProps });

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
