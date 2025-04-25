// ** React Imports
import { Link } from "react-router-dom";

// ** Columns
import { COURSE_RESERVED_COMMON_COLUMNS } from "./course-reserved-common-columns";

// ** Core Imports
import { useCourseById } from "../../../core/services/api/course/useCourseById.api";

// ** Utils
import { showErrorToast } from "../../../utility/toast.utils";

// ** Image Imports
import blankThumbnail from "../../../assets/images/common/blank-thumbnail.jpg";

export const COURSE_RESERVED_PAGE_COLUMNS = (isUserDetailsPage) => [
  {
    name: "نام دوره",
    reorder: true,
    width: isUserDetailsPage ? "100px" : "200px",
    cell: (row) => {
      // ** Hooks
      const { data: course, error } = useCourseById(row.courseId);

      if (error) showErrorToast("مشکلی در دریافت دوره به وجود آمد !");

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
  ...COURSE_RESERVED_COMMON_COLUMNS(true),
];
