import { AppProps } from 'next/app';
import Head from 'next/head';
import { Router } from 'next/router';
import { useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../styles/index.scss';

import cssVars from 'css-vars-ponyfill';
import NProgress from 'nprogress'; // nprogress module

import AuthContextProvider from 'contexts/authContext';

type IProps = AppProps;

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeError', () => NProgress.done());
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});

// This default export is required in a new `pages/_app.js` file.
function MyApp({ Component, pageProps }: IProps) {
  cssVars({
    // Options...
  });
  const host: string = useMemo(() => {
    if (process.browser) {
      return window.location?.origin;
    }
    return '';
  }, []);

  return (
    <AuthContextProvider>
      <Head>
        <script src="/tinymce/tinymce.min.js" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
        />
        <meta name="theme-color" content="red" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Application Title" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="msapplication-navbutton-color" content="red" />
        <meta name="msapplication-TileColor" content="red" />
        <meta name="msapplication-TileImage" content="ms-icon-144x144.png" />
        <meta name="msapplication-config" content="browserconfig.xml" />
        <meta name="application-name" content="Application Name" />
        <meta name="msapplication-tooltip" content="Tooltip Text" />
        <meta name="msapplication-starturl" content="/" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="full-screen" content="yes" />
        <meta name="browsermode" content="application" />
        <meta name="nightmode" content="enable/disable" />
        <meta name="layoutmode" content="fitscreen/standard" />
        <meta name="imagemode" content="force" />
        <meta name="screen-orientation" content="portrait" />
        <title>RFQ - CRES</title>
      </Head>
      <ToastContainer />
      <Component host={host} {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp;
