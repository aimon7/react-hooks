import React from 'react';

export const initialState = {
    isLoggedIn: false,
    onLogout: null,
}

const AuthContext = React.createContext(initialState);

export default AuthContext;
