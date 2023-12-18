import { Button, Flowbite } from 'flowbite-react';
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';
import { flowbiteTheme } from '../../../../../lib/flowbiteTheme';
function Pagination({ currentPage, setCurrentPage, totalPages }) {

    const currentPages = currentPage.paidLeave

    const totalPage = totalPages.paidLeave

    const nextPage = () => {
        if (currentPages.page || currentPages.pageSearch || currentPages.pageFilter < totalPage) {
            setCurrentPage((prevState) => ({
                ...prevState,
                paidLeave: {
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
                paidLeave: {
                    page: !currentPages.search && !currentPages.pageFilter && currentPages.page - 1,
                    all: null,
                    pageSearch: currentPages.pageSearch && currentPages.pageSearch - 1,
                    pageFilter: currentPages.pageFilter && currentPages.pageFilter - 1
                }
            }))
        }
    }

    const handleAll = () => {
        setCurrentPage({
            paidLeave: {
                page: null,
                all: 'all',
                pageSearch: null,
                pageFilter: null
            }
        })
    }
    console.log(currentPage);

    return (
        <div className="flex justify-center items-center h-1/5 mt-5 gap-3">
            <Flowbite theme={{ theme: flowbiteTheme }}>
                <Button onClick={prevPage} disabled={currentPages.pageSearch ? currentPages.pageSearch === 1 : currentPages.pageFilter ? currentPages.pageFilter === 1 : currentPages.page === 1} color='primary' className=''>
                    <GrFormPreviousLink size={20} />
                </Button>
                <p className="text-primary text-base p-1">
                    Page {currentPages.all || currentPages.pageSearch || currentPages.pageFilter || currentPages.page} of {totalPage}
                </p>
                <Button color='primary' onClick={nextPage} disabled={currentPages.pageSearch || currentPages.pageFilter || currentPages.page === totalPage}>
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