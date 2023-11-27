// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { usePresenceCurrentUser } from '../api/fetchDataCurrentUser/useFetchPresence';
// import { usePermissionCurrentUser } from '../api/fetchDataCurrentUser/useFetchPermission';
// import { useLeaveCurrentUser } from '../api/fetchDataCurrentUser/useFetchLeave';

// const DataCurrentUser = createContext();

// export const DataCurrentUserProvider = ({ children }) => {
//     const [paidLeaveData, setPaidLeaveData] = useState(null);
//     const [presenceData, setPresenceData] = useState(null);
//     const [permissionData, setPermissionData] = useState(null);

//     const { refetch: refetchLeaveData } = useLeaveCurrentUser();
//     const { refetch: refetchPresenceData } = usePresenceCurrentUser();
//     const { refetch: refetchPermissionData } = usePermissionCurrentUser();
//     console.log(paidLeaveData, presenceData, permissionData);
//     const fetchData = async () => {
//         try {
//             const paidLeaveResult = await refetchLeaveData();
//             setPaidLeaveData(paidLeaveResult.data);

//             const presenceResult = await refetchPresenceData();
//             setPresenceData(presenceResult.data);

//             const permissionResult = await refetchPermissionData();
//             setPermissionData(permissionResult.data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, [refetchLeaveData, refetchPresenceData, refetchPermissionData]); // Fetch data when the component mounts
//     return (
//         <DataCurrentUser.Provider value={{ paidLeaveData, presenceData, permissionData, refetchLeaveData, refetchPresenceData, refetchPermissionData}}>
//             {children}
//         </DataCurrentUser.Provider>
//     );
// };

// export const useDataCurrentUser = () => {
//     const context = useContext(DataCurrentUser);
//     if (!context) {
//         console.error('useDataCurrentUser must be used within a AuthProvider');
//     }
//     return context;
// };