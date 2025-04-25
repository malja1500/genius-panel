// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { Bookmark, BookOpen, Code, Mail } from "react-feather";

// ** User Components
import TeacherCourses from "./TeacherCourses";
import UserComments from "./UserComments";
import UserCourseReserve from "./UserCourseReserves";
import UserCourses from "./UserCourses";

const UserTabs = ({ active, toggleTab, user }) => {
  const isTeacher = user?.roles
    .map((role) => role.roleName)
    .includes("Teacher");
  const userName = `${user?.fName}-${user?.lName}`;

  return (
    <Fragment>
      <Nav pills className="mb-2">
        {isTeacher && (
          <NavItem>
            <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
              <Code className="font-medium-3 me-50" />
              <span className="fw-bold">دوره های استاد</span>
            </NavLink>
          </NavItem>
        )}
        <NavItem>
          <NavLink
            active={active === (isTeacher ? "2" : "1")}
            onClick={() => toggleTab(isTeacher ? "2" : "1")}
          >
            <Bookmark className="font-medium-3 me-50" />
            <span className="fw-bold">دوره های رزرو شده</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === (isTeacher ? "3" : "2")}
            onClick={() => toggleTab(isTeacher ? "3" : "2")}
          >
            <BookOpen className="font-medium-3 me-50" />
            <span className="fw-bold">دوره های کاربر</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === (isTeacher ? "4" : "3")}
            onClick={() => toggleTab(isTeacher ? "4" : "3")}
          >
            <Mail className="font-medium-3 me-50" />
            <span className="fw-bold">نظرات کاربر</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        {isTeacher && (
          <TabPane tabId="1">
            <TeacherCourses userName={userName} />
          </TabPane>
        )}
        <TabPane tabId={isTeacher ? "2" : "1"}>
          <UserCourseReserve courseReserve={user?.coursesReseves} />
        </TabPane>
        <TabPane tabId={isTeacher ? "3" : "2"}>
          <UserCourses userCourses={user?.courses} />
        </TabPane>
        <TabPane tabId={isTeacher ? "4" : "3"}>
          <UserComments />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default UserTabs;
