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
import React, { useContext, useEffect, useState } from "react";
import { ExamContext } from "../../../context/exam-context";
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
import ExamTable from "./ExamTable";

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
  const {fetchAllExams} = useContext(ExamContext);
  const [examData, setExamData] = useState({
    rows: [],
    examTableHeader: [],
    examNestedTableHeader: []
  })

  useEffect(() => {
    fetchAllExams()
    . then(data => {
      if(data.resultShort && data.resultShort === 'success') {
        setExamData({
          ...examData,
          rows: data.exams,
          examTableHeader: data.examTableHeader,
          examNestedTableHeader: data.examNestedTableHeader
        })
      }
    })
    // return () => {
    //   cleanup
    // }
  }, [])

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
              <Input style={{ width: "100%" }} label="Search Student" value={searchStudent} onChange={handleSearchInput} />
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
        <ExamTable rows={examData.rows} ExamTableHeader={examData.examTableHeader} ExamNestedTableHeader={examData.examNestedTableHeader} />
      </Paper>
    </>
  );
};

export default Exams;
