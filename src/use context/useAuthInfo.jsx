import React, { createContext, useContext, useEffect, useState } from 'react';
import { useInfoToken } from '../api/authToken/useInfoToken';
import { useFetchCurrentUser } from '../api/authToken/useFetchCurrentUser';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState('');
    const [validToken, setValidToken] = useState(true);
    
    //info token user
    const { data: userId, refetch: refetchInfoToken, isError: errorToken, isSuccess } = useInfoToken()
    console.log(userId);
    //saat pertama dirender isi dari dataUser merupakan userId lalu diproses dalam getDataUser dan dataUser menjadi data baru
    const { data: dataUser, refetch: refetchDataUser } = useFetchCurrentUser({ userId })
    
    useEffect(() => {
        if (errorToken) {
            return setValidToken(false);
        }
        setUserData(dataUser)
    }, [dataUser, userId, errorToken])

    return (
        <AuthContext.Provider value={{ userData, setUserData, validToken, setValidToken, refetchInfoToken, refetchDataUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthInfo = () => {
    const context = useContext(AuthContext);
    if (!context) {
        console.error('useAuthInfo must be used within a AuthProvider');
    }
    return context;
};