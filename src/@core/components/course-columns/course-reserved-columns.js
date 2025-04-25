// ** React Imports
import { Link } from "react-router-dom";

// ** Column Imports
import { COURSE_RESERVED_COMMON_COLUMNS } from "./course-reserved-common-columns";

// ** Core Imports
import { useUserWithId } from "../../../core/services/api/user/useUserWithId";

// ** Image Imports
import blankThumbnail from "../../../assets/images/common/blank-thumbnail.jpg";

export const COURSE_RESERVED_COLUMNS = (isCourseDetails) => [
  {
    name: "نام رزرو کننده",
    reorder: true,
    minWidth: isCourseDetails ? "170px" : "250px",
    cell: (row) => {
      const { data: user } = useUserWithId(row.studentId);

      return (
        <Link
          to={`/users/${row.studentId}`}
          className="d-flex align-items-center"
        >
          <img
            src={
              user?.currentPictureAddress !== "Not-set"
                ? user?.currentPictureAddress
                : blankThumbnail
            }
            className="student-course-reserve-picture"
          />
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
  ...COURSE_RESERVED_COMMON_COLUMNS(false),
];
