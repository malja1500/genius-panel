// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { Bookmark } from "react-feather";

// ** User Components
import CourseUserList from "./CourseUserList";

const CourseGroupDetailsTab = ({ active, toggleTab, group }) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <Bookmark className="font-medium-3 me-50" />
            <span className="fw-bold">لیست کاربران دوره</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <CourseUserList courseUserList={group?.courseUserListDto} />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default CourseGroupDetailsTab;
