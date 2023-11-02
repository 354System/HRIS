import React, { createContext, useContext, useEffect, useState } from 'react';
import { useInfoToken } from '../features/authToken/useInfoToken';
import { useGetDataUser } from '../features/authToken/useGetDataUser';

const UserContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState([]);
    const [validToken, setValidToken] = useState(false);

    const { data: userId, refetch: refetchInfoToken } = useInfoToken()

    const { data: dataUser, isLoading} = useGetDataUser({ userId })
    console.log(userData);

    useEffect(() => {
        setUserData(dataUser)
    }, [dataUser])

    return (
        <UserContext.Provider value={{ userData, setUserData, validToken, setValidToken, refetchInfoToken, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuthInfo = () => {
    const context = useContext(UserContext);
    if (!context) {
        console.error('useAuthInfo must be used within a AuthProvider');
    }
    return context;
};