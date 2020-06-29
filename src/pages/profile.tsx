import { NextPage } from 'next';
import { BaseLayout } from 'containers';
import { Typography } from '@material-ui/core';
import { Container } from 'components';
import { checkAuthServ } from 'utils/checkAuthServ';
import { EditUserInfo } from 'containers/Forms/EditUserInfo';

import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import UserIcon from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThreadIcon from '@material-ui/icons/Description';
import Box from '@material-ui/core/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export function ScrollableTabsButtonForce() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="profile menu list"
        >
          <Tab label="Informations" icon={<UserIcon />} {...a11yProps(0)} />
          <Tab label="Mes threads" icon={<ThreadIcon />} {...a11yProps(1)} />
          <Tab label="Mes favoris" icon={<FavoriteIcon />} {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <Container>
        <TabPanel value={value} index={0}>
          <Typography variant="h4" component="h2">
            Modifier mon profil
          </Typography>
          <EditUserInfo />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Container>
    </div>
  );
}

const EditProfile: NextPage = () => {
  return (
    <BaseLayout>
      <ScrollableTabsButtonForce />
    </BaseLayout>
  );
};

EditProfile.getInitialProps = async (ctx) => {
  const token = checkAuthServ(ctx);
  return {};
};
export default EditProfile;
