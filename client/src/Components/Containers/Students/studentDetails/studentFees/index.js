import React from 'react'
import {
    makeStyles,
    Table as MuiTable,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    columnContainer: {
        display: "flex",
        flexDirection: "column",
    },
    noPadding: {
        padding: "0px",
    },
    paddingTop: {
        paddingTop: "10px",
    },
    "MuiAccordion-root": {
        paddingTop: "5px",
    },
    alignRight: {
        marginLeft: '119px'
    },
    halfWidth: {
        width: "50%"
    },
    table: {
        marginTop: theme.spacing(3),
        "& thead th": {
            fontWeight: "600",
            color: theme.palette.text.main,
            backgroundColor: theme.palette.primary.main,
        },
        "& tbody td": {
            fontWeight: "300",
        },
        "& tbody tr:hover": {
            backgroundColor: "#fffbf2",
            cursor: "pointer",
        },
    },
    title: {
        color: "black"
    }
}));

const StudentFees = ({ feesDetails, totalPaid }) => {
    const styles = useStyles()
    console.log("feesDetails", feesDetails);
    return (
        <MuiTable className={`${styles.table}`}>
            <TableHead>
                <TableRow key="Header">
                    {feesDetails.feesTableHeaders.map((header, index) => {
                        return (
                            <TableCell key={index}>{header.label}</TableCell>
                        )
                    })}
                </TableRow>
            </TableHead>
            <TableBody>
                {feesDetails.feesDetailsRow.map(row => {
                    return (
                        <TableRow key={row.id}>
                            {
                                feesDetails.feesTableHeaders.map((rowCell, index) => {
                                    const value = row[rowCell.id];
                                    return <TableCell key={index} className={styles.title}>{value}</TableCell>
                                })
                            }
                        </TableRow>
                    )
                })}
                <TableRow key="lastRow">
                    <TableCell key="empty1"></TableCell>
                    <TableCell key="empty2"></TableCell>
                    <TableCell key="empty3"></TableCell>
                    <TableCell key="totalPaid" style={{ textAlign: "right" }} className={styles.title}>Total Paid</TableCell>
                    <TableCell key="empty4" className={styles.title}>{totalPaid}</TableCell>
                    <TableCell key="empty5"></TableCell>
                    <TableCell key="empty6"></TableCell>
                </TableRow>
            </TableBody>
        </MuiTable>
    )
}

export default StudentFees