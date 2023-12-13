import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import { IoMdNotificationsOutline } from 'react-icons/io'
export default function NavbarUser(props) {

    const [UserInfo, setUserInfo] = useState({});
    const [id, setId] = useState('');


    useEffect(() => {
        // Fetch data from backend when the component mounts
        fetch('https://fzsxpv5p-3000.asse.devtunnels.ms/user/user-info', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Mengembalikan promise dari response.json()
                return response.json();
            })
            .then(data => {
                setId(data.user_info.id); // Menggunakan data.id, karena objek respon memiliki properti "id"
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [])
    useEffect(() => {
        fetch(`https://fzsxpv5p-3000.asse.devtunnels.ms/user/by/${id}`, {
            method: 'GET',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUserInfo(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id])




    return (
        <div className='laptop:w-full flex justify-center items-center'>
            <nav className="laptop:fixed hp:absolute z-10 top-6 laptop:right-8 hp:right-3 laptop:w-[89.4%] h-[80px] hp:w-[94%] flex items-center justify-between bg-white p-6 shadow-lg rounded-lg backdrop-blur-md mb-10">
                <div>
                    <span className="navtitle laptop:text-xl hp:text-base font-semibold text-black">{props.title}</span>
                </div>
                <div className="laptop:relative laptop:flex laptop:items-center laptop:gap-x-6">
                    <div className='hp:hidden laptop:block'>
                        <input
                            type="text"
                            id="search"
                            placeholder="Quick Search..."
                            className="w-64 h-10 pl-10 bg-gray-100 text-sm placeholder:text-grey rounded"
                        />
                    </div>
                    <div className="hp:hidden laptop:flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <FiSearch color='#9295AB' size={18} />
                    </div>
                    <div className='border-1-2 flex items-center laptop:px-5 hp:px-3 laptop:gap-4 hp:gap-2'>
                        <div className='hp:hidden laptop:block'>
                            <IoMdNotificationsOutline color='primary' size={30} className='hp:w-6 hp:h-6' />
                        </div>
                        <div className='hp:flex  laptop:border-l-2 laptop:flex laptop:items-center laptop:px-5 laptop:gap-4'>
                            <div>
                                <img src="/src/assets/image1584.png" alt="" className='hp:w-7 hp:h-7 laptop:w-10 laptop:h-10 rounded-full' />
                            </div>
                            <div className='flex flex-col text-sm hp:text-xs'>
                                <p className=''>{UserInfo?.role}</p>
                                <p>{UserInfo?.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
