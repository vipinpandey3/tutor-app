// import styles from './App.module.css';
import { CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core'
import { Route, Switch } from 'react-router-dom'
import Dashboard from './Pages/Dashboard';
import Tutors from './Components/Containers/Tutors/Tutors';
import Students from './Components/Containers/Students/Students';
import StudentDetails from './Components/Containers/Students/StudentDetails';
import Exams from './Components/Containers/Exams/Exams'
import TutorDetails from './Components/Containers/Tutors/TutorDetails'
import Sidebar from './Pages/Sidebar';
import Navbar from './Pages/Navbar';
import Fees from './Components/Containers/Fees/Fees'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: "#4791db",
      dark: '#115293'
    },
    secondary: {
      main: '#dc004e',
      light: '#e33371',
      dark: '#9a0036'
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00'
    },
    success: {
      main: '#81c784',
      light: '#81c784',
    }
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)'
      }
    }
  },
  props: {
    MuiIconButton: {
      disableRipple: true
    }
  },
  shape: {
    borderRadius: "4px"
  },
  MuiTypography: {
    variantMapping: {
      h1: 'h2',
      h2: 'h2',
      h3: 'h2',
      h4: 'h2',
      h5: 'h2',
      h6: 'h2',
      subtitle1: 'h2',
      subtitle2: 'h2',
      body1: 'span',
      body2: 'span',
    },
  }
})

const useStyles = makeStyles({
  appMain: {
    paddingLeft: '250px',
    width: '100%'
  }
})

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme} >
      <Sidebar />
      <div className={classes.appMain}>
        <Navbar />
        <Switch>
          <Route path="/dashboard" exact>
            <Dashboard />
          </Route>
          <Route path="/tutors" exact>
            <Tutors />
          </Route>
          <Route path="/tutors/:tutorId" exact>
            <TutorDetails />
          </Route>
          <Route path="/students" exact>
            <Students />
          </Route>
          <Route path="/students/:studentId" exact>
            <StudentDetails />
          </Route>
          <Route path="/exams" exact>
            <Exams />
          </Route>
          <Route path="/fees" exact>
            <Fees />
          </Route>
          <Route path="*" >
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
