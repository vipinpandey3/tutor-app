/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
// import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../utils/theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NavLinks from "../utils/NavLinks";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import { useNavigate } from "react-router";
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
// import {setCollapsed} from '../../redux/actions/authAction'
import { NavLink } from "react-router-dom/cjs/react-router-dom";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({auth: {isAuth, token, error, message, institutes, user, isCollapsed}, setCollapsed}) => {
  const [userData, setUserData] = useState({})
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  // const navigate = useNavigate()
  useEffect(() => {
    if (isAuth) {
      let userName = localStorage.getItem('userName');
      // setUserData({
      //   ...userData,
      //   userName: userName,
      //   userRole: localStorage.getItem('userRole'),
      //   institutes: localStorage.getItem('instituteName').toUpperCase()
      // })
    }
  }, [])

  // const goToAdminPage = () => {
  //   console.log('goToAdminPage');
  //   navigate('/admin')
  // }
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  {userData.institutes}
                </Typography>
                <IconButton onClick={() => setCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              {/* <Box textAlign="center">
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {userData.userName}
                    <span onClick={goToAdminPage}>
                      <KeyboardTabIcon/>
                    </span>
                  </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {userData.userRole}
                </Typography>
              </Box> */}
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
          {
              NavLinks.map(link=> {
                return <NavLink to={link.path}>
                {link.name}
              </NavLink>
            })
            }
            {/* {
              NavLinks.map(link=> {
                return <Item
                title={link.name}
                to={link.path}
                icon={link.icons}
                selected={selected}
                setSelected={setSelected}
                key={link.id}
              />
            })
            } */}
            {/* <Item title="Dashboard" to="/" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected}/>
              <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
                Data
              </Typography>
            <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

Sidebar.propTypes= {
  auth: PropTypes.object.isRequired,
  // setCollapsed: PropTypes.func.isRequired
}

const mapStateToProps =state => {
  return {
      auth: state.auth
  }
}

export default connect(mapStateToProps, {})(Sidebar);
