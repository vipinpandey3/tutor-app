// import styles from './App.module.css';
import {  makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core'
import { ColorModeContext, useMode } from "./utils/theme";
import { Route, Switch } from 'react-router-dom'
import Dashboard from './components/containers/dashboard/Dashboard';
import Tutors from './components/containers/Tutors/Tutors';
import Students from './components/containers/Students/students/Loadable';
import StudentDetails from './components/containers/Students/studentDetails/Loadable';
import Exams from './components/containers/Exams/Exams'
import TutorDetails from './components/containers/Tutors/TutorDetails'
import Fees from './components/containers/Fees/Fees'
import Users from './components/containers/Users/Users';
import Login from './pages/Login'
import ProtectedRoute from './components/containers/ProtectedRoute';
import Sidebar from './pages/Sidebar';
import Navbar from './pages/Navbar';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import io from 'socket.io-client';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2',
//       light: "#4791db",
//       dark: '#115293'
//     },
//     secondary: {
//       main: '#dc004e',
//       light: '#e33371',
//       dark: '#9a0036'
//     },
//     warning: {
//       main: '#ff9800',
//       light: '#ffb74d',
//       dark: '#f57c00'
//     },
//     success: {
//       main: '#81c784',
//       light: '#81c784',
//     },
//     text: {
//       main: "#ffffff"
//     },
//     white: {
//       white: "#ffffff"
//     },
//     black: "#000000"
//   },
//   overrides: {
//     MuiAppBar: {
//       root: {
//         transform: 'translateZ(0)'
//       }
//     }
//   },
//   props: {
//     MuiIconButton: {
//       disableRipple: true
//     }
//   },
//   shape: {
//     borderRadius: "4px"
//   },
//   MuiTypography: {
//     variantMapping: {
//       h1: 'h2',
//       h2: 'h2',
//       h3: 'h2',
//       h4: 'h2',
//       h5: 'h2',
//       h6: 'h2',
//       subtitle1: 'h2',
//       subtitle2: 'h2',
//       body1: 'span',
//       body2: 'span',
//     },
//   }
// })

const useStyles = makeStyles({
  appMain: {
    paddingLeft: '250px',
    width: '100%'
  }
})

function App({auth: {isAuth}}) {
  // const socket = io.connect('http://localhost:4000');
  // socket.on('connect', (int) => {
  //   console.log('Socket is connected =========', socket.id);
  //   socket.emit('on_pign', {text: 'ping'})
  //   socket.on('on_pong', (data) => {
  //     console.log('On Pong', data);
  //   }
  //   )
    
  // })
  //   socket.on('get_student', socket => {
  //     console.log('socket result => socket', socket)
  //   });
  // socket.on('upload_excel',(socket)=> {
  //   console.log('socket ==========>', socket)
  // })
  const classes = useStyles();
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme} >
        {isAuth && <Sidebar />}
        <div className={classes.appMain}>
          {isAuth && <Navbar />}
          <Switch>
            {!isAuth && <Route exact path="/" component={Login} /> }
            {isAuth && <Route exact path="/" component={Dashboard} /> }
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute exact path="/tutors" component={Tutors} />
            <ProtectedRoute exact path="/tutors/:tutorId" component={TutorDetails} />
            <ProtectedRoute exact path="/students" component={Students} />
            <ProtectedRoute exact path="/students/:studentId" component={StudentDetails} />
            <ProtectedRoute exact path="/exams" component={Exams} />
            <ProtectedRoute exact path="/fees" component={Fees} />
            <ProtectedRoute exact path="/users" component={Users} />

            {/* <Route path="/" render={() => {!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} loginHandler={loginHandler} /> : <ProtectedRoute />}} /> */}
          </Switch>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

App.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, {})(App);