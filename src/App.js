import React from 'react';
import {Header, Footer} from './components/common';
import {BrowserRouter} from 'react-router-dom';
import Routes from './routes';

const App = () => {
  return(
    <>
      <BrowserRouter>
        <Header />
        <Routes />
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
