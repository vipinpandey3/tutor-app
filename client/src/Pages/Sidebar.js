import { makeStyles } from "@material-ui/core";
import { styles } from "@material-ui/pickers/views/Calendar/Calendar";
import React from "react";
import { NavLink } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import NavLinks from "./NavLinks";

const useStyles = makeStyles((theme) => ({
  sideMenu: {
    width: "250px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    backgroundColor: theme.palette.primary.light,
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
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      width: "250px",
      color: "white"
    },
  },
  linkStyle: {
    textDecoration: "none",
    color: "#000000",
    paddingLeft: "10px",
    padding: "10px",
  },
  iconPadding: {
    paddingLeft: "20px"
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
  }
}));

const Sidebar = () => {
  const classes = useStyles();
  return (
    <section className={classes.sideMenu}>
      <div className={classes.logoConttainer}>
        <p className={classes.logo}>Tutors App</p>
      </div>
      <ul className={classes.menuContainer}>
        {NavLinks.map((link) => {
          return (
            <li key={link.id} className={classes.menuList}>
              <span className={classes.iconPadding}>{link.icons}</span>
              <NavLink className={classes.linkStyle} to={link.path}>
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