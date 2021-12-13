import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import useTable from '../../../customsHooks/useTable';

const ExamTable = (props) => {
    const {rows, ExamTableHeader, ExamNestedTableHeader} = props; 
    const [open, setOpen] = useState(false)

    const {stableSort, handleTableSorting, Pagination, getComparator, setOrder, setOrderBy, orderBy, order, page, rowsPerPage} = useTable(rows)

    const toggleRow = (id) => {
        setOpen(prevState => !prevState)
        console.log('Id', id);
        rows[id-1].expanded = open
    }

    const createSortHandler = (property) => (event) => {
        handleTableSorting(property)
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                <TableRow>
                    <TableCell />
                    {
                        ExamTableHeader.map(cellValue => {
                            return (
                                <TableCell key={cellValue.id}>
                                    <TableSortLabel
                                        active={orderBy === cellValue.id}
                                        direction={orderBy === cellValue.id ? order : 'asc'}
                                        onClick={createSortHandler(cellValue.id)}
                                    >
                                       {cellValue.label}
                                        {orderBy === cellValue.id ? (
                                            <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </Box>
                                        ) : null}
                                    </TableSortLabel>
                                </TableCell>
                            )
                        })
                    }
                </TableRow>
                </TableHead>
                <TableBody>
                    {
                        stableSort(rows, getComparator(order, orderBy))
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row, index) => {
                            return (
                                <>
                                    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                        <TableCell key={index + 0.}>
                                            <IconButton
                                                aria-label="expand row"
                                                size="small"
                                                onClick={() => {toggleRow(row.ExamId)}}
                                            >
                                                {row.expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                            </IconButton>
                                        </TableCell>
                                            {
                                                ExamTableHeader.map(cellValue => {
                                                    const value = row[cellValue.id];
                                                    return (
                                                        <TableCell key={value} component="th" scope="row">
                                                            {value}
                                                        </TableCell>
                                                    )
                                                })
                                            }
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                                        <Collapse in={row.expanded} timeout="auto" unmountOnExit>
                                            <Box sx={{ margin: 1 }}>
                                            <Typography variant="h6" gutterBottom component="div">
                                                Schedule
                                            </Typography>
                                            <Table size="small" aria-label="subjectd">
                                                <TableHead>
                                                <TableRow>
                                                    {
                                                        ExamNestedTableHeader.map(cellValue => {
                                                            return (
                                                                <TableCell key={cellValue.id}>
                                                                    {cellValue.label}
                                                                </TableCell>
                                                            )
                                                        })
                                                    }
                                                </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        row.examSubjects.subjects.map((subject, index) => {
                                                            return (
                                                                <TableRow key={index}>
                                                                    {
                                                                        ExamNestedTableHeader.map(cellValue => {
                                                                            const value = subject[cellValue.id];
                                                                            return (
                                                                                <TableCell key={cellValue.id}>
                                                                                    {value}
                                                                                </TableCell>
                                                                            )
                                                                        })
                                                                    }
                                                                </TableRow>
                                                            )
                                                        })
                                                    }
                                                </TableBody>
                                            </Table>
                                            </Box>
                                        </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </>
                            )
                        })
                    }
                </TableBody>
            </Table>
            <Pagination />
        </TableContainer>
    )
}

export default ExamTable
