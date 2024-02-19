import { makeStyles } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
import NavLinks from "../utils/NavLinks";
import {tokens} from '../utils/theme'
import { useTheme } from "@mui/material";
import logo from '../assets/img/classMent.png'

const useStyles = makeStyles((theme) => ({
  sideMenu: {
    width: "250px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.main,
    fontSize: "20px",
  },
  menuContainer: {
    // position: "absolute",
    // top: "40px",
    // left: "0px",
    // marginTop: '10px'
  },
  menuList: {
    listStyleType: "none",
    paddingBottom: "10px",
    paddingTop: "10px",
    textTransform: "uppercase",
    // display: "inline-block",
    // width: "250px",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      width: "250px",
      color: "white"
    },
  },
  linkStyle: {
    textDecoration: "none",
    color: theme.palette.text.main,
    paddingLeft: "10px",
    padding: "10px",
  },
  iconPadding: {
    paddingLeft: "10px",
    paddingRight: "10px"
  },
  logoConttainer: {
    width: "100%",
    borderBottom: '1px solid black',
    height: "63px",
    // textAlign: 'center'
  },
  logo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center'
  },
  activeMenuItem: {
    backgroundColor: "#6a5acd",
    width: "250px",
    display: "inline-block"
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navLinks = () => {
    let roleId = JSON.parse(localStorage.getItem('roleId'))
    const filteredNavLinks = NavLinks.filter((link) => link.roles.includes(roleId));
    return filteredNavLinks
  }


  return (
    <section className={classes.sideMenu} style={
      {
        backgroundColor: colors.blueAccent[200]
      }
    }>
      <div className={classes.logoConttainer}>
        {/* <p className={classes.logo} style={{
              color: colors.white['white']
            }}>Tutors App</p> */}
        <img src={logo} alt="Logo" className={classes.logoImage} width={250} height={63} />
      </div>
      <ul className={classes.menuContainer}>
        {navLinks().map((link) => {
          return (
            <li key={link.id} style={{
              color: colors.white['white']
            }} className={classes.menuList}>
              {/* <span className={classes.iconPadding}>{link.icons}</span> */}
              <NavLink 
                className={classes.linkStyle}
                style={{
                  color: colors.white['white']
                }}
                to={link.path}
                activeClassName={classes.activeMenuItem}  
              >
                <span className={classes.iconPadding}>{link.icons}</span>
                {link.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Sidebar;