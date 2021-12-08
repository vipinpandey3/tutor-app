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

const ExamTable = (props) => {
    
    const {rows, ExamTableHeader, ExamNestedTableHeader} = props; 
    const [open, setOpen] = useState(false)

    const toggleRow = (id) => {
        setOpen(prevState => !prevState)
        rows[id].expanded = open
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                <TableRow>
                    <TableCell />
                    {
                        ExamTableHeader.map(cellValue => {
                            return <TableCell key={cellValue.id}>{cellValue.label}</TableCell>
                        })
                    }
                </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows.map((row, index) => {
                            console.log('Rows.examId', row.ExamId);
                            return (
                                <>
                                    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                        <TableCell>
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
                                                        <TableCell component="th" scope="row">
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
        </TableContainer>
    )
}

export default ExamTable
