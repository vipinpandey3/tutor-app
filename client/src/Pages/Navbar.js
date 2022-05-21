import {
  AppBar,
  Toolbar,
  Grid,
  InputBase,
  IconButton,
  Badge,
  makeStyles,
  Paper,
  MenuList,
  MenuItem,
} from "@material-ui/core";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import SearchIcon from "@material-ui/icons/Search";
import { Popper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { logout } from '../redux/actions/authAction'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
    color: "#000",
  },
  searchInput: {
    opacity: "0.6",
    padding: `0px ${theme.spacing(1)}px`,
    fontSize: "0.8rem",
    "&:hover": {
      backgroundColor: "#e9dcce",
    },
    "& MuiSvgIcon-root": {
      marginRight: theme.spacing(1),
    },
  },
  menuList: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  button: {
    color: 'grey'
  },
}));

const Navbar = ({auth: {isAuth, token}, logout}) => {
  const classes = useStyles();
  const [loggedInUser, setLoggedInUser] = useState('')
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const history = useHistory()
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const logoutHandler = () => {
    setOpen(false);
    logout();
    history.push('/')
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('firstName'))
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
            <InputBase
              className={classes.searchInput}
              placeholder="Search Here..."
              startAdornment={<SearchIcon fontSize="small" />}
            />
          </Grid>
          <Grid item sm></Grid>
          <Grid item>
            <div className={classes.menuList}>
              <div>
                <IconButton>
                  <Badge badgeContent={4} color="secondary">
                    <NotificationsNoneIcon fontSize="small" />
                  </Badge>
                </IconButton>
                <IconButton>
                  <Badge badgeContent={3} color="primary">
                    <ChatBubbleOutlineIcon fontSize="small" />
                  </Badge>
                </IconButton>

                <Button
                  ref={anchorRef}
                  aria-controls={open ? "menu-list-grow" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                  className={classes.button}
                >
                  {loggedInUser}
                </Button>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                  style={{
                    zIndex: 10000
                  }}
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="menu-list-grow"
                            onKeyDown={handleListKeyDown}
                          >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>
                              My account
                            </MenuItem>
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes= {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps =state => {
  return {
      auth: state.auth
  }
}

export default connect(mapStateToProps, {logout})(Navbar);
