import { TablePagination } from '@material-ui/core';
import React, { useState } from 'react'

export default function useTable(data) {

    const pages = [5, 10, 25];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])
    const [order, setOrder] = useState('desc')
    const [orderBy, setOrderBy] = useState('standard')

    const handlePageChange = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = ( event ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0)
    }

    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if(order !== 0) return order;
                return a[1] - b[1];
        })
        const data = stabilizedThis.map((e1) => e1[0]);
        return data
    }

    const getComparator = (order, orderBy) => {
        return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy)
    }


    const descendingComparator = (a, b, orderBy) => {
        if(b[orderBy] < a[orderBy]) {
            return -1;
        }
        if(b[orderBy] > a[orderBy]) {
            return 1;
        } return 0;
    }
    

    const handleTableSorting = (cellId) => {
        const isAsc = orderBy === cellId && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(cellId)
    }

    const Pagination = () => {
        return <TablePagination
                    component="div"
                    count={data.length}
                    page={page}
                    rowsPerPage={rowsPerPage} 
                    rowsPerPageOptions={pages}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                /> 
    }
    
    return {
        Pagination,
        stableSort,
        handleTableSorting,
        getComparator,
        orderBy,
        order,
        page,
        rowsPerPage
    }
}
