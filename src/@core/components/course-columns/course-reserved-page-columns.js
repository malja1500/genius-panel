// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

// ** Columns
import { COURSE_RESERVED_COMMON_COLUMNS } from "./course-reserved-common-columns";

// ** Core Imports
import { getCourseByIdAPI } from "../../../core/services/api/course/get-course-by-id.api";

// ** Image Imports
import blankThumbnail from "../../../assets/images/common/blank-thumbnail.jpg";

export const COURSE_RESERVED_PAGE_COLUMNS = (isUserDetailsPage) => [
  {
    name: "نام دوره",
    reorder: true,
    width: isUserDetailsPage ? "110px" : "200px",
    cell: (row) => {
      // ** States
      const [course, setCourse] = useState();

      // ** Get Course
      useEffect(() => {
        const fetchCourse = async () => {
          try {
            const getCourse = await getCourseByIdAPI(row.courseId);

            setCourse(getCourse);
          } catch (error) {
            toast.error("مشکلی در دریافت دوره به وجود آمد !");
          }
        };

        fetchCourse();
      }, []);

      return (
        <Link
          to={`/courses/${row.courseId}`}
          className="d-flex align-items-center"
        >
          <img
            src={
              !course?.imageAddress ||
              course?.imageAddress === "undefined" ||
              course?.imageAddress === "<string>"
                ? blankThumbnail
                : course?.imageAddress
            }
            className="student-course-reserve-picture"
          />
          <div className="text-truncate ms-1">
            <span
              to={`/users/${row.studentId}`}
              className="course-reserve-student-name"
            >
              {row.courseName}
            </span>
          </div>
        </Link>
      );
    },
  },
  !isUserDetailsPage && {
    name: "نام رزرو کننده",
    reorder: true,
    minWidth: "200px",
    cell: (row) => {
      return (
        <Link to={`/users/${row.studentId}`}>
          <div className="user-info text-truncate ms-1">
            <span
              to={`/users/${row.studentId}`}
              className="course-reserve-student-name"
            >
              {row.studentName}
            </span>
          </div>
        </Link>
      );
    },
  },
  ...COURSE_RESERVED_COMMON_COLUMNS("/course-reserved"),
];
