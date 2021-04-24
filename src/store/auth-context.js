import React, { useEffect, useState } from 'react';

export const initialState = {
    isLoggedIn: false,
    onLogout: () => {
    },
    onLogin: (email, password) => {
    },
}

const AuthContext = React.createContext(initialState);

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storeUsedLoggedInInformation = localStorage.getItem('isLoggedIn');
        if (storeUsedLoggedInInformation === '1')
            setIsLoggedIn(true);
    }, [])

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    const loginHandler = (email, password) => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    };

    return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
            onLogout: logoutHandler,
            onLogin: loginHandler
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContext;
