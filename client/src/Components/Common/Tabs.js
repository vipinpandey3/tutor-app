import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  selectedTab: {
    backgroundColor: theme.palette.primary.main,
    color: "black"
  }
}))

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function CMentTabs({tabs, handleChange, value, children}) {
  const styles = useStyles()
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
            value={value} 
            onChange={handleChange} 
            aria-label="ClassMent common Tabs"
            textColor="secondary"
            indicatorColor="secondary"
        >
            {
                tabs.map(tab => {
                  return <Tab label={tab?.label} className={tab.id === value ? styles.selectedTab : ""} key={tab?.id} {...a11yProps(tab?.id)} />
                })
            }
        </Tabs>
      </Box>
      {children}
    </Box>
  );
}
