import { Button, Flowbite } from 'flowbite-react';
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';
import { flowbiteTheme } from '../../../../../lib/flowbiteTheme';
function Pagination({ currentPage, setCurrentPage, totalPages }) {

    const currentPages = currentPage?.permission

    const nextPage = () => {
        if (!currentPages.page && !currentPages.pageSearch && currentPages.pageFilter < totalPages) {
            setCurrentPage((prevState) => ({
                ...prevState,
                permission: {
                    page: !currentPages.search && !currentPages.pageFilter && currentPages.page + 1,
                    all: null,
                    pageSearch: currentPages.pageSearch && currentPages.pageSearch + 1,
                    pageFilter: currentPages.pageFilter && currentPages.pageFilter + 1
                }
            }))
        }
    };

    const prevPage = () => {
        if (currentPages.page || currentPages.pageSearch || currentPages.pageFilter > 1) {
            setCurrentPage((prevState) => ({
                ...prevState,
                permission: {
                    page: !currentPages.search && !currentPages.pageFilter && currentPages.page - 1,
                    all: null,
                    pageSearch: currentPages.pageSearch && currentPages.pageSearch - 1,
                    pageFilter: currentPages.pageFilter && currentPages.pageFilter - 1
                }
            }))
        }
    }

    const handleAll = () => {
        setCurrentPage((prevState) => ({
            ...prevState,
            permission: {
                page: null,
                all: 'all',
                pageSearch: null,
                pageFilter: null
            }
        }))
    }

    return (
        <div className="flex justify-center items-center h-1/5 mt-5 gap-3">
            <Flowbite theme={{ theme: flowbiteTheme }}>
                <Button onClick={prevPage} disabled={currentPages.pageSearch || currentPages.pageFilter || currentPages.page === 1} color='primary' className=''>
                    <GrFormPreviousLink size={20} />
                </Button>
                <p className="text-primary text-base p-1">
                    Page {currentPages.all || currentPages.pageSearch || currentPages.pageFilter || currentPages.page} of {totalPages}
                </p>
                <Button color='primary' disabled={currentPages.pageSearch ? currentPages.pageSearch === totalPages : currentPages.pageFilter ? currentPages.pageFilter === totalPages : currentPages.page === totalPages} onClick={nextPage}>
                    <GrFormNextLink size={20} />
                </Button>
                <Button onClick={handleAll} color='primary'>
                    ALL
                </Button>
            </Flowbite>
        </div>
    );
}
export default Pagination