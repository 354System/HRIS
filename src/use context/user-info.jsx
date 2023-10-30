// import React, { createContext, useContext, useState, useEffect } from 'react';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [userInfo, setUserInfo] = useState('');
//   const [validToken, setValidToken] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const authToken = localStorage.getItem('authToken');
//         if (authToken) {
//           const response = await fetch('https://fzsxpv5p-3000.asse.devtunnels.ms/user/userinfo', {
//             method: 'GET',
//             headers: {
//               Authorization: `Bearer ${authToken}`,
//             },
//           });
//           if (response.ok) {
//             const res = await response.json();
//             const id = res.id
//             const userResponse = await fetch(`https://fzsxpv5p-3000.asse.devtunnels.ms/user/${id}`, {
//               method: 'GET',
//             });
//             const userData = await userResponse.json();
//             setUserInfo(userData);
//             setValidToken(true);
//           } else {
//             setValidToken(false);
//             console.log('Gagal mendapatkan data pengguna');
//           }
//         }
//       } catch (error) {
//         console.error('authToken error', error);
//       }
//     };
    
//     fetchData();
//   }, [])

//   return (
//     <UserContext.Provider value={{ userInfo, setUserInfo, validToken, setValidToken }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUserInfo = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     console.error('useUserInfo must be used within a UserProvider');
//   }
//   return context;
// };
