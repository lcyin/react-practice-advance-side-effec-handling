import React, { useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './context/auth-context';

function App() {
  const ctx = useContext(AuthContext);
  // Provider refer to component with react context (state)
  return (
    <React.Fagment>
      <MainHeader />
      <main>
        {/* onLogin props exist because directly use in Login and Home component */}
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </React.Fagment>
  );
}

export default App;
