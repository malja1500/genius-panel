// ** React Imports
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ** Custom Components
import CourseGroupForm from "../@core/components/CourseGroupForm";

// ** Core Imports
import { getCourseGroupDetailsAPI } from "../core/services/api/course/course-group/get-course-group-details.api";

const EditCourseGroupPage = () => {
  // ** States
  const [courseGroup, setCourseGroup] = useState();

  // ** Hooks
  const { id } = useParams();

  useEffect(() => {
    const fetchCourseGroup = async () => {
      try {
        const getCourseGroup = await getCourseGroupDetailsAPI(id);

        setCourseGroup(getCourseGroup.courseGroupDto);
      } catch (error) {
        return false;
      }
    };

    fetchCourseGroup();
  }, []);

  return <CourseGroupForm group={courseGroup} />;
};

export default EditCourseGroupPage;
