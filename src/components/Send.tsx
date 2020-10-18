import React, { useState, useContext } from "react";
import {
  AppBar,
  Tab,
  Tabs,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { TabContext, TabPanel } from "@material-ui/lab";
import {
  CropFree as ScanIcon,
  ImportContacts as ContactsIcon,
} from "@material-ui/icons";
import QrReader from "react-qr-scanner";

const useStyles = makeStyles( theme => ({
  appbar: {
    flex: 1,
  },
  panel: {
    marginTop: theme.spacing(8),
  },
  qrCode: {
    marginRight: theme.spacing(65),
  },
  contacts: {
    marginLeft: theme.spacing(65),
  },
}));

export const Send = (props: any) => {
  const classes = useStyles();
  const scanner = {
    height: 360,
    width: 522,
  };
  const [scan, setScan] = useState();
  const [addressOpt, setAddressOpt] =useState("qrCode");

  const updateSelection = (event: React.ChangeEvent<{}>, selectedTab: string) => {
    setAddressOpt(selectedTab);
  };
  const handleScan = (data: any) => {
    setScan(data);
  };

  return (
    <>
      <TabContext value={addressOpt}>
        <AppBar position="fixed" className={classes.appbar}>
          <Tabs
            value={"qrCode"}
            onChange={updateSelection}
            indicatorColor="secondary"
            textColor="secondary"
            variant="fullWidth"
          >
            <Tab value="qrCode" icon={<ScanIcon />} />
            <Tab value="contacts" icon={<ContactsIcon />} />
          </Tabs>
        </AppBar>
        <TabPanel value="qrCode" className={classes.panel}>
          { scan
            ? <Typography> {scan} </Typography>
            : <QrReader
              delay={100}
              style={scanner}
              onError={(err: any) => console.log(err)}
              onScan={handleScan}
            />
          }
        </TabPanel>
        <TabPanel value="contacts" className={classes.panel}>
          Contacts
        </TabPanel>
        <Typography> Sending Payment </Typography>
      </TabContext>
    </>
  )
};
