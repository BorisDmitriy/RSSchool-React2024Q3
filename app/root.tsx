import { Provider } from 'react-redux';
import { Links, Outlet } from '@remix-run/react';
import stylesUrl from './styles/index.css?url';
import store from '../src/redux/store';

export const links = () => [{ rel: 'stylesheet', href: stylesUrl }];

export default function Root() {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/alien.png" />
        <meta charSet="utf-8" />
        <title>Species in Star Wars!</title>
        <Links />
      </head>
      <body>
        <Provider store={store}>
          <Outlet /> {/* This will render child routes */}
        </Provider>
      </body>
    </html>
  );
}
