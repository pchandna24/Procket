import React from 'react';
import { Tab, Tabs, IconButton } from '@mui/material';
// import 'react-tabs/style/react-tabs.css';
import SideBar from '../sidebar/sidebar';
// import Tabs from '../tabs/tabs';
// import Tab from '../tab/tab';

import './body.css';
import CustomTabs from '../customTab/customTab';

// const handleClose = useCallback(
//   (event, tabToDelete) => {
//     // stop event from propagating to the target element's parent
//     event.stopPropagation();

//     const tabToDeleteIndex = activetabs.findIndex(
//       (tab) => tab.id === tabToDelete.id
//     );
//     const updatedTabs = activetabs.filter((tab, index) => {
//       return index !== tabToDeleteIndex;
//     });
//     const previousTab =
//       activetabs[tabToDeleteIndex - 1] ||
//       activetabs[tabToDeleteIndex + 1] ||
//       {};
//     setActiveTabs(updatedTabs);
//     setActiveTab(previousTab.id);
//   },
//   [activetabs]
// );

const Body = () => {
  return (
    <div>
      <SideBar />
      <CustomTabs />
      {/* <Tabs className="test2">
        <Tab title="Procket" tabName="Procket">
          <div className="test">hi</div>
        </Tab>
        <Tab title="Procket2" tabName="Procket2">
          <div className="test">hi</div>
        </Tab>
      </Tabs> */}
      {/* <Tabs>
        <Tab
          label={
            <span>
              Active
              <IconButton
                size="small"
                component="div"
                onClick={(event) => handleClose(event, tab)}
              >
                <button>hi</button>
              </IconButton>
            </span>
          }
        />
        <Tab label="Active" />
      </Tabs> */}
    </div>
  );
};

export default Body;
