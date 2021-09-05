import { makeStyles } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import NavLinks from "./NavLinks";
// import styles from './Sidebar.module.css'

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
    position: "absolute",
    top: "40px",
    left: "0px",
  },
  menuList: {
    listStyleType: "none",
    paddingBottom: "10px",
    paddingTop: "10px",
    textTransform: "uppercase",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      width: "250px",
    },
  },
  linkStyle: {
    textDecoration: "none",
    color: "#000000",
    paddingLeft: "10px",
    padding: "10px",
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  return (
    <section className={classes.sideMenu}>
      <ul className={classes.menuContainer}>
        {NavLinks.map((link) => {
          return (
            <li key={link.id} className={classes.menuList}>
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
