import React, { createContext, useContext, useEffect, useState } from 'react';

interface userDetailsProps {
    email: string,
    firstName: string,
    lastName: string,
    id: number
}

interface providerProps {
    children: React.ReactNode
}

const defaultUserDetails: userDetailsProps = {
    email: '',
    firstName: '',
    lastName: '',
    id: 0
}

// Context
const LoginContext: React.Context<any> = createContext<any>(null);

const LoginProvider: React.FC<providerProps> = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userDetails, setUserDetails] = useState<userDetailsProps>(defaultUserDetails);

    useEffect(() => {
        const sessionData = sessionStorage.getItem('user');
        if (sessionData) {
            setIsLoggedIn(true)
            setUserDetails(JSON.parse(sessionData))
            console.log('logged in')
        } else {
            setIsLoggedIn(false)
            setUserDetails(defaultUserDetails)
            console.log('not logged in')
        }
    }, [])

    return (
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, userDetails, setUserDetails }}>
            { children }
        </LoginContext.Provider>
    );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;