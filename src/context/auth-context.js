import React, { useState, useEffect } from 'React';

// reuturn an object contain component
const AuthContext = React.createContext({
  isLoggedIn: false,
  // default dummy function
  onLogout: () => {},
  onLogin: (email, password) => {},
});
// Extract authentication logic to separate component
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Use Effect execute after every component re-evaluation
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
    // empty dependencies tells react only run when intital render
  }, []);
  const loggoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };
  const loginHandler = () => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: loggoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
