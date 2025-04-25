// ** React Imports
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ** Reactstrap Imports
import {
  Badge,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

// ** Third Party Components
import {
  CheckCircle,
  Edit,
  Eye,
  MoreVertical,
  RotateCcw,
  Trash,
  X,
} from "react-feather";

// ** Core Imports
import { useCourseReserveWithId } from "../../../core/services/api/course/course-reserve/useCourseReserveWithId";

// ** Utils
import { useHandleActiveInactiveCourse } from "../../../utility/active-inactive-course.utils";
import { persianNumberFormatter } from "../../../utility/persian-number-formatter-helper";
import { useHandleDeleteCourse } from "../../../utility/useDeleteCourseAlert";

// ** Custom Components
import CourseReservedModal from "./CourseReservedModal";

// ** Image Imports
import blankThumbnail from "../../../assets/images/common/blank-thumbnail.jpg";

// ** Table columns
export const COURSE_COLUMNS = [
  {
    name: "نام دوره",
    sortable: true,
    minWidth: "180px",
    sortField: "title",
    cell: (row) => {
      const [courseImageSrc, setCourseImageSrc] = useState();

      useEffect(() => {
        setCourseImageSrc(row.tumbImageAddress ?? blankThumbnail);
      }, [row]);

      return (
        <div className="d-flex justify-content-left align-items-center gap-1">
          <img
            src={courseImageSrc}
            onError={() => setCourseImageSrc(blankThumbnail)}
            className="course-column-image"
          />
          <div className="d-flex flex-column">
            <Link
              to={`/courses/${row.courseId}`}
              className="course-column-truncate text-body"
            >
              <span className="fw-bolder text-primary">{row.title}</span>
            </Link>
            <small className="text-truncate text-muted mb-0">
              {row.typeName}
            </small>
          </div>
        </div>
      );
    },
  },
  {
    name: "نام مدرس",
    sortable: true,
    minWidth: "150px",
    sortField: "fullName",
    cell: (row) => (
      <div className="mr-5">
        <span className="text-sm text-truncate">{row?.fullName}</span>
      </div>
    ),
  },
  {
    name: "قیمت",
    sortable: true,
    minWidth: "70px",
    sortField: "cost",
    cell: (row) => {
      const formattedPrice = persianNumberFormatter(row.cost) || 0;

      return <span className="course-column-truncate">{formattedPrice}</span>;
    },
  },
  {
    name: "وضعیت برگزاری",
    sortable: true,
    minWidth: "120px",
    sortField: "statusName",
    cell: (row) => (
      <span className="course-column-truncate course-column-status">
        {row.statusName}
      </span>
    ),
  },
  {
    sortable: true,
    name: "وضعیت",
    minWidth: "10px",
    sortField: "active",
    cell: (row) => {
      // ** Hooks
      const handleActiveInactiveCourse = useHandleActiveInactiveCourse();

      return (
        <Badge
          color={
            row.isActive === true
              ? "light-success"
              : row.isActive === false
              ? "light-danger"
              : "light-warning"
          }
          className="course-column-badge cursor-pointer"
          onClick={() => handleActiveInactiveCourse(row.isActive, row.courseId)}
        >
          {row.isActive ? "فعال" : "غیر فعال"}
        </Badge>
      );
    },
  },
  {
    sortable: true,
    name: "وضعیت حذف",
    minWidth: "110px",
    sortField: "isdelete",
    cell: (row) => {
      const handleDeleteCourse = useHandleDeleteCourse();

      return (
        <Badge
          color={
            row.isdelete === true
              ? "light-danger"
              : row.isdelete === false
              ? "light-success"
              : "light-warning"
          }
          className="course-column-is-delete"
          onClick={() => handleDeleteCourse(row.isdelete, row.courseId)}
        >
          {row.isdelete ? "حذف شده" : "حذف نشده"}
        </Badge>
      );
    },
  },
  {
    name: "عملیات",
    minWidth: "152px",
    cell: (row) => {
      // ** States
      const [modal, setModal] = useState(null);

      // ** Hooks
      const { data: courseReserve, isLoading: isCourseReserveLoading } =
        useCourseReserveWithId(row.courseId);
      const handleActiveInactiveCourse = useHandleActiveInactiveCourse();
      const handleDeleteCourse = useHandleDeleteCourse();

      // ** Toggle modal function
      const toggleModal = (id) => {
        if (modal !== id) {
          setModal(id);
        } else {
          setModal(null);
        }
      };

      const handleCourseReserveClick = async () => {
        toggleModal(row.courseId);
      };

      return (
        <div className="column-action d-flex align-items-center gap-1">
          <UncontrolledDropdown direction="top">
            <DropdownToggle tag="span">
              <MoreVertical size={17} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem
                tag={Link}
                to={`/courses/${row.courseId}`}
                className="w-100"
              >
                <Eye size={14} className="me-50" />
                <span className="align-middle">جزئیات</span>
              </DropdownItem>
              <DropdownItem
                tag={Link}
                to={`/courses/edit/${row.courseId}`}
                className="w-100"
              >
                <Edit size={14} className="me-50" />
                <span className="align-middle">ویرایش</span>
              </DropdownItem>
              <DropdownItem
                className="w-100"
                onClick={() => handleDeleteCourse(row.isdelete, row.courseId)}
              >
                {row.isdelete ? (
                  <RotateCcw size={14} className="me-50" />
                ) : (
                  <Trash size={14} className="me-50" />
                )}
                <span className="align-middle">
                  {row.isdelete ? "برگرداندن" : "حذف"}
                </span>
              </DropdownItem>
              <DropdownItem
                className="w-100"
                onClick={() =>
                  handleActiveInactiveCourse(row.isActive, row.courseId)
                }
              >
                {row.isActive ? (
                  <X size={14} className="me-50" />
                ) : (
                  <CheckCircle size={14} className="me-50" />
                )}
                <span className="align-middle">
                  {row.isActive ? "غیر کردن دوره" : "فعال کردن دوره"}
                </span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <div>
            <Button color="primary" onClick={handleCourseReserveClick}>
              رزرو ها
            </Button>
            <CourseReservedModal
              id={row.courseId}
              title={row.title}
              toggleModal={toggleModal}
              modal={modal}
              courseReserve={courseReserve}
              isLoading={isCourseReserveLoading}
            />
          </div>
        </div>
      );
    },
  },
];
