import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
function Pagination({ setCurrentItems, sortData }) {

    const [currentPage, setCurrentPages] = useState(1)
    const itemsPerPage = 6;

    const pages = []

    for (let i = 1; i <= Math.ceil(length / itemsPerPage); i++) {
        pages.push(i);
    }

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const newCurrentItems = sortData.slice(startIndex, endIndex);
        setCurrentItems(newCurrentItems);
    }, [currentPage, sortData]);

    const nextPage = () => {
        if (currentPage < pages.length) {
            setCurrentPages(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPages(currentPage - 1);
        }
    }

    return (
        <div className="flex justify-center h-1/5 mt-5">
            <button onClick={prevPage}>
                <Icon icon="grommet-icons:form-previous-link" fontSize={30} className="text-primary" />
            </button>
            <p className="text-primary text-base p-1">
                Page {currentPage} of {Math.ceil(sortData.length / itemsPerPage)}
            </p>
            <button onClick={nextPage}>
                <Icon icon="grommet-icons:form-next-link" fontSize={30} className="text-primary" />
            </button>
        </div>
    );
}
export default Pagination