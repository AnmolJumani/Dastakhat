import AsyncStorage from '@react-native-async-storage/async-storage';

import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [authname, setUsername] = useState();

  function authenticate(username, token) {
    setAuthToken(token);
    setUsername(username);
    AsyncStorage.setItem('token', token);
    AsyncStorage.setItem('username', username);
  }

  function logout() {
    setAuthToken(null);
    setUsername(null);
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('name');
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;