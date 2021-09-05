import { TablePagination } from '@material-ui/core';
import React, { useState } from 'react'

export default function useTable(data, filterFunction) {

    const pages = [5, 10, 25];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])
    const [order, setOrder] = useState()
    const [orderBy, setOrderBy] = useState()

    const handlePageChange = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = ( event ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0)
    }

    const recordsAfterPagingAndSorting = () => {
        return stableSort(filterFunction.fn(data), getComparator(order, orderBy)).slice(page*rowsPerPage, (page + 1)*rowsPerPage)
    }

    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if(order !== 0) return order;
                return a[1] - b[1];
        })

        return stabilizedThis.map((e1) => e1[0]);
    }

    function getComparator(order, orderBy) {
        return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy)
    }

    const descendingComparator = (a, b, orderBy) => {
        if(b[orderBy] < a[orderBy]) {
            return -1;
        }
        if(b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const handleTableSorting = (cellId) => {
        const isAsc = orderBy === cellId && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(cellId)
    }

    const TblePagination = () => {
        return <TablePagination
                    component="div"
                    count={data.length}
                    page={page}
                    rowsPerPage={rowsPerPage} 
                    rowsPerPageOptions={pages}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                /> 
    }
    
    return {
        TblePagination,
        recordsAfterPagingAndSorting,
        handleTableSorting,
        orderBy,
        order
    }
}
