import {makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    table: {
        width: '1350px',
        "&.MuiTable-root": {
            marginTop: '10px',
        },
    },
    'MuiTableCell-root': {
        padding: '7px',
        border: '1px solid rgba(224, 224, 224, 1)'
    }
}))

const TeacherAttendenceTable = () => {
    const styles = useStyles();
    return (
        <TableContainer>
            <Table className={styles.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">
                            Date
                        </TableCell>
                        <TableCell align="center">
                            Lectures
                        </TableCell>
                        <TableCell align="center">
                            Total Hours
                        </TableCell>
                        <TableCell align="center">
                            Attendence
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align="center">
                            01-08-2021/03-08-2021
                        </TableCell>
                        <TableCell align="right">
                            5
                        </TableCell>
                        <TableCell align="right">
                            7 
                        </TableCell>
                        <TableCell align="right">
                            66.66%
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TeacherAttendenceTable
