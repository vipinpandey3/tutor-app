import React, { useState } from "react";
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
    filterFunction,
    openInPopup,
    redirectToDetailsPage,
  } = props;
  const [tableRecords, setTableRecords] = useState(records);
  // const [filterFunction, setFilterFunction] = useState({fn: items => {return items}})
  const {
    TblePagination,
    recordsAfterPagingAndSorting,
    handleTableSorting,
    orderBy,
    order,
  } = useTable(tableRecords, filterFunction);
  return (
    <>
      <MuiTable className={classes.table}>
        <TableHead>
          <TableRow>
            {headCells.map((cell, index) => {
              return (
                <TableCell>
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
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recordsAfterPagingAndSorting().map((row) => {
            return (
              <TableRow
                key={row.id}
                onClick={() => {
                  redirectToDetailsPage(row.id);
                }}
              >
                {headCells.map((rowCell) => {
                  const value = row[rowCell.id];
                  return <TableCell>{value}</TableCell>;
                })}
                <TableCell>
                  <ActionButton
                    onClick={() => openInPopup(row)}
                    color="primary"
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </ActionButton>
                  <ActionButton
                    color="secondary"
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
                </TableCell>
                {/* <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.emailId}</TableCell>
                <TableCell>{row.aadharNo}</TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell>
                  <ActionButton
                    onClick={() => openInPopup(row)}
                    color="primary"
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </ActionButton>
                  <ActionButton
                    color="secondary"
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
                </TableCell> */}
              </TableRow>
            );
          })}
        </TableBody>
      </MuiTable>
      <TblePagination />
    </>
  );
}

export default Table;
