import React from 'React';

// reuturn an object contain component
const AuthContext = React.createContext({
  isLoggedIn: false,
});

export default AuthContext;
