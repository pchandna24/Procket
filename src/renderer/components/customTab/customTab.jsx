/* eslint-disable radix */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  Tabs,
  Tab,
  Grid,
  Button,
  AppBar,
  Typography,
  Box,
} from '@mui/material';
// import Box from '@material-ui/core/Box';
import { withStyles } from '@mui/styles';
import Add from '@mui/icons-material/Add';
import Close from '@mui/icons-material/Close';
import cloneDeep from 'lodash/cloneDeep';
import './customTab.css';
import TabContent from '../tabContent/tabContent';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return <div {...other}>{value === index && <Box p={3}>{children}</Box>}</div>;
}

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '60px',
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    color: 'inherit',
    // backgroundColor: theme.palette.background.paper,
  },
});

class CustomTabs extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      value: 0,
      tabList: [
        {
          key: 0,
          id: 0,
        },
      ],
    };
  }

  addTab = () => {
    this.setState((state, props) => {
      const tabList = cloneDeep(state.tabList);
      // update this to get more tabs
      if (this.state.tabList.length === 1) {
        return {
          tabList,
        };
      }
      const id = tabList[tabList.length - 1].id + 1;
      tabList.push({
        key: id,
        id,
      });

      return {
        tabList,
      };
    });
  };

  deleteTab = (e) => {
    // prevent MaterialUI from switching tabs
    e.stopPropagation();

    // Cases:
    // Case 1: Single tab.
    // Case 2: Tab on which it's pressed to delete.
    // Case 3: Tab on which it's pressed but it's the first tab
    // Case 4: Rest all cases.
    // Also cleanup data pertaining to tab.

    // Case 1:
    if (this.state.tabList.length === 1) {
      return; // If you want all tabs to be deleted, then don't check for this case.
    }

    // Case 2,3,4:
    const tabID = parseInt(e.target.id);
    let tabIDIndex = 0;

    const tabList = this.state.tabList.filter((value, index) => {
      if (value.id === tabID) {
        tabIDIndex = index;
      }
      return value.id !== tabID;
    });

    this.setState(
      (state, props) => {
        let curValue = parseInt(state.value);
        if (curValue === tabID) {
          // Case 3:
          if (tabIDIndex === 0) {
            curValue = state.tabList[tabIDIndex + 1].id;
          }
          // Case 2:
          else {
            curValue = state.tabList[tabIDIndex - 1].id;
          }
        }
        return {
          value: curValue,
        };
      },
      () => {
        this.setState({
          tabList,
        });
      }
    );
  };

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    // console.log(this.state);
    return (
      <div>
        <div className="parent">
          <AppBar position="static">
            <Grid
              container
              alignItems="center"
              justify="center"
              className="appbar"
            >
              <Grid item xl={11} lg={11} md={11} sm={11} xs={11}>
                <Tabs
                  value={value}
                  onChange={this.handleTabChange}
                  indicatorColor="black"
                  textColor="black"
                  variant="scrollable"
                  scrollButtons="auto"
                  className="tabs"
                >
                  {this.state.tabList.map((tab) => (
                    <Tab
                      key={tab.key.toString()}
                      value={tab.id}
                      label={`Tab ${tab.id + 1}`}
                      icon={<Close id={tab.id} onClick={this.deleteTab} />}
                      iconPosition="end"
                      className="mytab"
                    />
                  ))}
                </Tabs>
              </Grid>
            </Grid>
          </AppBar>

          <Grid item xl={1} lg={1} md={1} sm={1} xs={1} borderWidth="0px">
            <Button variant="outlined" onClick={this.addTab}>
              <div className="add">
                <Add />
              </div>
            </Button>
          </Grid>
        </div>
        {this.state.tabList.map((tab) => (
          <TabPanel value={value} index={tab.id}>
            <div className="tabContent">
              <TabContent />
            </div>
          </TabPanel>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(CustomTabs);
// export default CustomTabs;
