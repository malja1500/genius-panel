// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

// ** Reactstrap Imports
import { Col, Row } from "reactstrap";

// ** Core Imports
import { getCourseGroupDetailsAPI } from "../core/services/api/course/course-group/get-course-group-details.api";

// ** Custom Components
import CourseGroupInfoCard from "../@core/components/CourseGroupDetails/CourseGroupInfoCard";
import CourseGroupDetailsTab from "../@core/components/CourseGroupDetails/Tabs";

const CourseGroupDetailsPage = () => {
  // ** States
  const [courseGroup, setCourseGroup] = useState();
  const [active, setActive] = useState("1");

  // ** Hooks
  const { id } = useParams();

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  useEffect(() => {
    const fetchCourseGroup = async () => {
      try {
        const getCourseGroup = await getCourseGroupDetailsAPI(id);

        setCourseGroup(getCourseGroup);
      } catch (error) {
        toast.error("مشکلی در دریافت گروه دوره به وجود آمد !");
      }
    };

    fetchCourseGroup();
  }, []);

  return (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <CourseGroupInfoCard group={courseGroup} />
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <CourseGroupDetailsTab
            active={active}
            toggleTab={toggleTab}
            group={courseGroup}
          />
        </Col>
      </Row>
    </div>
  );
};

export default CourseGroupDetailsPage;
