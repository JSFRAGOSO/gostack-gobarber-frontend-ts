import React from 'react';
import GlobalStyle from './styles/global';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const App: React.FC = () => (
  <>
    <SignUp />
    <GlobalStyle />
  </>
);

export default App;
