import React from 'react';

export const initialState = {
    isLoggedIn: false
}

const AuthContext = React.createContext(initialState);

export default AuthContext;
