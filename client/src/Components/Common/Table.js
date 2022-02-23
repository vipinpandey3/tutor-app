import React from "react";
import {
  makeStyles,
  Table as MuiTable,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import { TableBody } from "@material-ui/core";
import useTable from "../../customsHooks/useTable";
import ActionButton from "./ActionButton";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
// import Tooltip from '@mui/material/Tooltip';
import MuiToolTip from "./ToolTip";

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
}));

function Table(props) {
  const classes = useStyles();
  const {
    headCells,
    records,
    redirectToDetailsPage,
    edit
  } = props;
  // filterFunction,
  // openInPopup,
  // const [tableRecords, setTableRecords] = useState(records);
  // const [filterFunction, setFilterFunction] = useState({fn: items => {return items}})
  const {
    stableSort, handleTableSorting, Pagination, getComparator, orderBy, order, page, rowsPerPage
  } = useTable(records);
  return (
    <>
      <MuiTable className={classes.table}>
        <TableHead>
          <TableRow key="header">
            {headCells && headCells.length > 0 && headCells.map((cell, index) => {
              return (
                <TableCell key={index}>
                  {cell.disableSorting ? (
                    cell.label
                  ) : (
                    <TableSortLabel
                      active={orderBy === cell.id}
                      direction={orderBy === cell.id ? order : "asc"}
                      onClick={() => handleTableSorting(cell.id)}
                    >
                      {cell.label}
                    </TableSortLabel>
                  )}
                </TableCell>
              );
            })}
            <TableCell key={'Actions'}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records && records.length > 0 ? 
            stableSort(records, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => {
              return (
                <TableRow
                  key={row.id}
                >
                  {headCells.map((rowCell, index) => {
                    const value = row[rowCell.id];
                    return <TableCell key={index} onClick={() => {
                      redirectToDetailsPage(row.id);
                    }}>{value}</TableCell>;
                  })}
                  <TableCell key={'actionButtons'}>
                    <ActionButton
                      onClick={() => edit(row)}
                      color="primary"
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </ActionButton>
                    <MuiToolTip title="Add" placement="top-start">
                      <ActionButton
                        // color="secondary"
                        onClick={() => {
                          // setConfirmDialog({
                          //     isOpen: true,
                          //     title: "Are you sure you want to delete tutor?",
                          //     subTitle: "Operation once done can not be undone?",
                          //     onConfirm: () => {onDeleteT(tutor.id)}
                          // })
                        }}
                      >
                      <CloseOutlinedIcon fontSize="small" />
                    </ActionButton>
                  </MuiToolTip>                  
                </TableCell>
              </TableRow>
            );
          }) : <TableRow>
            No Data Found
          </TableRow>
          }
        </TableBody>
      </MuiTable>
      <Pagination />
    </>
  );
}

export default Table;
