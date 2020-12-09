import dynamic from "next/dynamic";
import React from "react";
import App from "next/app";

import GlobalStyles from "../components/GlobalStyles/GlobalStyles";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
};

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

// export default MyApp;

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
