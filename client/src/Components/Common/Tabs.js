import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

// function CustomTabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// CustomTabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function CMentTabs({tabs, handleChange, value, children}) {
//   const [value, setValue] = React.useState(tabValue);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

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
                    return <Tab label={tab?.label} key={tab?.id} {...a11yProps(tab?.id)} />
                })
            }
        </Tabs>
      </Box>
      {children}
    </Box>
  );
}
