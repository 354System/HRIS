import { Button, Flowbite } from 'flowbite-react';
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';
import { flowbiteTheme } from '../../../../lib/flowbiteTheme';
function Pagination({ currentPage, setCurrentPage, totalPages }) {

    const nextPage = () => {
        if (currentPage.page || currentPage.pageSearch || currentPage.pageFilter < totalPages) {
            setCurrentPage({
                page: currentPage.page && currentPage.page + 1,
                all: null,
                pageSearch: currentPage.pageSearch && currentPage.pageSearch + 1,
                pageFilter: currentPage.pageFilter && currentPage.pageFilter + 1
            })
        }
    };

    const prevPage = () => {
        if (currentPage.page || currentPage.pageSearch || currentPage.pageFilter > 1) {
            setCurrentPage({
                page: currentPage.pageFilter || currentPage.pageSearch || currentPage.page - 1,
                all: null,
                pageSearch: currentPage.pageSearch && currentPage.pageSearch - 1,
                pageFilter: currentPage.pageFilter && currentPage.pageFilter - 1
            })
        }
    }

    const handleAll = () => {
        setCurrentPage({
            page: currentPage.page,
            all: 'all',
        })
    }

    return (
        <div className="flex justify-center items-center h-1/5 mt-5 gap-3">
            <Flowbite theme={{ theme: flowbiteTheme }}>
                <Button onClick={prevPage} disabled={currentPage.pageSearch ? currentPage.pageSearch === 1 : currentPage.pageFilter ? currentPage.pageFilter === 1 : currentPage.page === 1} color='primary' className=''>
                    <GrFormPreviousLink size={20} />
                </Button>
                <p className="text-primary text-base p-1">
                    Page {currentPage.all || currentPage.pageSearch || currentPage.pageFilter || currentPage.page} of {totalPages}
                </p>
                <Button color='primary' disabled={currentPage.pageSearch ? currentPage.pageSearch === totalPages : currentPage.pageFilter ? currentPage.pageFilter === totalPages : currentPage.page === totalPages} onClick={nextPage}>
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