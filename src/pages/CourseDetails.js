// ** React Imports
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

// ** Reactstrap Imports
import { Col, Row } from "reactstrap";

// ** Core Imports
import { useCourseById } from "../core/services/api/course/useCourseById.api";

// ** User View Components
import CourseInfoCard from "../@core/components/CourseDetails/CourseInfoCard";
import CourseTabs from "../@core/components/CourseDetails/Tabs";

// ** Styles
import "@styles/react/apps/app-users.scss";

const CourseDetailsPage = () => {
  // ** States
  const [active, setActive] = useState("1");

  // ** Hooks
  const { id } = useParams();
  const { data: course } = useCourseById(id);

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  if (!course) <Navigate to="/courses" />;

  return (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5.2" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <CourseInfoCard course={course} />
        </Col>
        <Col
          xl="8"
          lg="7"
          xs={{ order: 0 }}
          md={{ order: 1, size: 7 }}
          className="course-tabs-wrapper"
        >
          <div className="course-tabs">
            <CourseTabs active={active} toggleTab={toggleTab} course={course} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CourseDetailsPage;
