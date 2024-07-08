// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

// ** Reactstrap Imports
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

// ** Icons Imports
import { Edit, Eye, MoreVertical } from "react-feather";

// ** Core Imports

// ** Utils

// ** Image Imports
import blankThumbnail from "../../../assets/images/common/blank-thumbnail.jpg";
import { getCourseByIdAPI } from "../../../core/services/api/course/get-course-by-id.api";

// ** Table columns
export const COURSE_GROUPS_COLUMNS = [
  {
    name: "نام گروه",
    sortable: true,
    width: "210px",
    sortField: "groupName",
    cell: (row) => {
      // ** States
      const [course, setCourse] = useState();

      useEffect(() => {
        const fetchCourse = async () => {
          try {
            const getCourse = await getCourseByIdAPI(row.courseId);

            setCourse(getCourse);
          } catch (error) {
            toast.error("مشکلی در دریافت دوره گروه به وجود آمد !");
          }
        };

        fetchCourse();
      }, []);

      return (
        <div className="d-flex justify-content-left align-items-center gap-1">
          <img
            src={
              !course?.imageAddress ||
              course?.imageAddress === null ||
              course?.imageAddress === "<string>"
                ? blankThumbnail
                : course?.imageAddress
            }
            className="course-column-image"
          />
          <div className="d-flex flex-column">
            <Link
              to={`/course-groups/${row.groupId}`}
              className="course-column-truncate blog-column-truncate text-body"
            >
              <span className="fw-bolder text-primary">{row.groupName}</span>
            </Link>
          </div>
        </div>
      );
    },
  },
  {
    name: "نام استاد",
    sortable: true,
    width: "200px",
    sortField: "teacherName",
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center gap-1">
        <div className="d-flex flex-column">
          <span>{row.teacherName}</span>
        </div>
      </div>
    ),
  },
  {
    name: "نام دوره",
    sortable: true,
    width: "270px",
    sortField: "courseName",
    cell: (row) => <span>{row.courseName}</span>,
  },
  {
    name: "ظرفیت گروه",
    sortable: true,
    width: "140px",
    sortField: "groupCapacity",
    cell: (row) => <span>{row.groupCapacity}</span>,
  },
  {
    name: "ظرفیت دوره",
    sortable: true,
    width: "140px",
    sortField: "courseCapacity",
    cell: (row) => <span>{row.courseCapacity}</span>,
  },
  {
    name: "عملیات",
    minWidth: "160px",
    cell: (row) => {
      // ** Hooks
      //   const navigate = useNavigate();

      return (
        <div className="column-action d-flex align-items-center gap-1">
          <UncontrolledDropdown>
            <DropdownToggle tag="span">
              <MoreVertical size={17} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem
                tag={Link}
                to={`/course-groups/edit/${row.groupId}`}
                className="w-100"
              >
                <Eye size={14} className="me-50" />
                <span className="align-middle">جزئیات</span>
              </DropdownItem>
              <DropdownItem
                tag={Link}
                to={`/course-groups/edit/${row.groupId}`}
                className="w-100"
              >
                <Edit size={14} className="me-50" />
                <span className="align-middle">ویرایش</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      );
    },
  },
];
