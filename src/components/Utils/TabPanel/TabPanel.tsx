import React from 'react';
import { Typography, Box } from '@material-ui/core'

export const TabPanel= ({ children, value, index, ...other }: TabPanelProps) => (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>  
);