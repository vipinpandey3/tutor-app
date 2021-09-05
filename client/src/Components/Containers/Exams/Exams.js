import {
  Checkbox,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
} from "@material-ui/core";
import React, { useState } from "react";
import MatButton from "../../Common/Button";
import Input from "../../Common/Input";
import Text from "../../Common/Text";
import {
  examResultData as rows,
  examDataColumnHeader as columns,
  examDateRows as examRows,
  examDateColumnHeader as examDateHeader,
  examDateRows
} from "./ExamData";
import ExamForm from "./ExamForm";

const useStyles = makeStyles((theme) => ({
  paperCotent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  table: {
    width: "1300px",
    "&.MuiTable-root": {
      marginTop: "10px",
    },
  },
  flexContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: 'center'
  },
}));

const TableHeaderRow = () => {
  return (
    <>
      <TableRow>
        {columns.map((header) => (
          <TableCell
            key={header.id}
            align={header.align}
            style={{ minWidth: header.minWidth }}
          >
            {header.label}
          </TableCell>
        ))}
      </TableRow>
    </>
  );
};

const examFormInput = [
  {
    id: "startDate",
    name: "startDate",
    label: "Start Date",
    type: 'date'
  },
  {
    id: "endDate",
    name: "endDate",
    label: "Start Date",
    type: 'date'
  },
  {
    id: "std",
    name: "std",
    label: "Standard",
    type: 'input'
  },
  {
    id: "batched",
    name: "batches",
    label: "Batches",
    type: 'input'
  },
  {
    id: "subjects",
    name: "subjects",
    label: "Subjects",
    type: "input"
  }
]

const initialExamFormValue = {
  startDate: new Date().toISOString().slice(0, 10),
  endDate: new Date().toISOString().slice(0, 10),
  std: '',
  batches: '',
  subjects: ''
}

const Exams = () => {
  const styles = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = useState([]);
  
  const [formTitle, setFormTitle] = useState("Schedule Exam")
  const [showExamForm, setShowExamForm] = useState(false);
  const [searchStudent, setSearchStudent] = useState("")

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0);
  }

  const CreateNewExam = () => {
    setShowExamForm(true)
    setFormTitle("ReschduleExam");
  }

  const SchduleExam = (formValue, flag) => {
    console.log('form value', formValue);
    setShowExamForm(flag)
  }

  const handleSearchInput = (e) => {
    setSearchStudent(e.target.value);
    console.log('e.target.value', e.target.value);
  }

  const hindeForm = () => {
    setShowExamForm(false)
  }

  return (
    <>
      <Paper className={styles.paperCotent}>
        <Grid container>
          <Grid container>
            <Grid item xs={3}>
              <Text variant="subtitle1" component="h1">
                Exam result
              </Text>
            </Grid>
            <Grid item sm></Grid>
            <Grid item xs={3}>
              <Input style={{ width: "100%" }} label="Search Student" valur={searchStudent} onChange={handleSearchInput} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid>
              <TableContainer>
                <Table
                  stickyHeader
                  aria-label="sticky table"
                  className={styles.table}
                >
                  <TableHead>
                    <TableHeaderRow />
                  </TableHead>
                  <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id}>{value}</TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15, 20]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      { showExamForm &&  <ExamForm hindeForm={hindeForm} initialExamFormValue={initialExamFormValue} formTitle={formTitle} SchduleExam={SchduleExam} examFormInput={examFormInput} />}      
      <Paper className={styles.paperCotent}>
        <Grid container className={styles.flexContainer}>
            <Grid container>
                <Grid item className="ptb_15">
                    <Text variant="subtitle1" component="subtitle1">
                        Upcoming Exams
                    </Text>
                </Grid>
                <Grid item sm></Grid>
                <Grid item alignItems="flex-end">
                    <Toolbar>
                    <MatButton
                      variant="contained"  
                      onClick={CreateNewExam}
                      color="primary"
                      size="medium"
                    >
                        Schedule New Exam
                    </MatButton>
                    </Toolbar>
                </Grid>
            </Grid>
        </Grid>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table
            className={styles.table}
            aria-labelledby="tableTitle"
            // size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    // indeterminate={numSelected > 0 && numSelected < rowCount}
                    // checked={rowCount > 0 && numSelected === rowCount}
                    // onChange={onSelectAllClick}
                    inputProps={{ 'aria-label': 'select all desserts' }}
                  />
                </TableCell>
                {examDateHeader.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    // sortDirection={orderBy === headCell.id ? order : false}
                  >
                      {headCell.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              { examDateRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = "" ;//isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow hover role="checkbox" aria-checked={isItemSelected}  key={row.id} selected={isItemSelected}
                      // onClick={(event) => handleClick(event, row.name)} 
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      {/* {
                        examDateHeader.map((column) => {
                          const value = row[column.id];
                          return <TableCell key={column.id}>{value}</TableCell>
                        })
                      } */}
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.examId}
                      </TableCell>
                      <TableCell >{row.startDate}</TableCell>
                      <TableCell >{row.endDate}</TableCell>
                      <TableCell >{row.examType}</TableCell>
                      <TableCell >{row.std}</TableCell>

                    </TableRow>
                  );
                })}
              {/* {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default Exams;
