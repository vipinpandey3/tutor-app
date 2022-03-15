// import styles from './App.module.css';
import {  makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core'
import { Route, Switch } from 'react-router-dom'
import Dashboard from './Components/Containers/dashboard/Dashboard';
import Tutors from './Components/Containers/Tutors/Tutors';
import Students from './Components/Containers/Students/Students';
import StudentDetails from './Components/Containers/Students/StudentDetails';
import Exams from './Components/Containers/Exams/Exams'
import TutorDetails from './Components/Containers/Tutors/TutorDetails'
import Fees from './Components/Containers/Fees/Fees'
import Users from './Components/Containers/Users/Users';
import Login from './Pages/Login'
import ProtectedRoute from './Components/Containers/ProtectedRoute';
import {AuthContext} from './context/auth-context'
import setAuthToken from './utils/setAuthToken';
import Sidebar from './Pages/Sidebar';
import Navbar from './Pages/Navbar';

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

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const classes = useStyles();
  const {isAuth} = useContext(AuthContext);

  return (
    <ThemeProvider theme={theme} >
      {isAuth && <Sidebar />}
      <div className={classes.appMain}>
        {isAuth && <Navbar />}
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          {isAuth ? <Route exact path="/" component={Dashboard} /> : <Route exact path="/" component={Login} /> }
          <ProtectedRoute exact path="/dashboard" component={Dashboard} isAuth={isAuth} />
          <ProtectedRoute exact path="/tutors" component={Tutors} isAuth={isAuth} />
          <ProtectedRoute exact path="/tutors/:tutorId" component={TutorDetails} isAuth={isAuth} />
          <ProtectedRoute exact path="/students" component={Students} isAuth={isAuth} />
          <ProtectedRoute exact path="/students/:studentId" component={StudentDetails} isAuth={isAuth} />
          <ProtectedRoute exact path="/exams" component={Exams} isAuth={isAuth} />
          <ProtectedRoute exact path="/fees" component={Fees} isAuth={isAuth} />
          <ProtectedRoute exact path="/users" component={Users} isAuth={isAuth} />

          {/* <Route path="/" render={() => {!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} loginHandler={loginHandler} /> : <ProtectedRoute />}} /> */}
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;