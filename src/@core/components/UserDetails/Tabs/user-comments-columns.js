// ** React Imports
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Reactstrap Imports
import { Badge, Button } from "reactstrap";

// ** Icon Imports
import { CheckCircle, Trash, XCircle } from "react-feather";

// ** Custom Components
import CourseReplyCommentModal from "../../course-columns/CourseReplyCommentModal";

// ** Core Imports
import { useAcceptCourseComment } from "../../../../core/services/api/course/course-comments/useAcceptCourseComment.api";
import { useDeleteCourseComment } from "../../../../core/services/api/course/course-comments/useDeleteCourseComment.api";
import { useRejectCourseComment } from "../../../../core/services/api/course/course-comments/useRejectCourseComment.api";
import { useCourseById } from "../../../../core/services/api/course/useCourseById.api";

// ** Image Imports
import blankThumbnail from "../../../../assets/images/common/blank-thumbnail.jpg";

export const USER_COMMENTS_COLUMNS = [
  {
    name: "نام دوره",
    reorder: true,
    minWidth: "160px",
    cell: (row) => {
      // ** Hooks
      const { data: course } = useCourseById(row.courseId);

      return (
        <div className="d-flex align-items-center">
          <img
            src={
              course?.imageAddress &&
              course?.imageAddress !== "undefined" &&
              course?.imageAddress !== "Not-set" &&
              course?.imageAddress !== "not-set"
                ? course?.imageAddress
                : blankThumbnail
            }
            className="student-course-reserve-picture"
          />
          <Link to={`/courses/${row.courseId}`}>
            <span className="course-reserve-student-name text-primary ms-1">
              {row.courseTitle}
            </span>
          </Link>
        </div>
      );
    },
  },
  {
    name: "تعداد ریپلای ها",
    reorder: true,
    minWidth: "60px",
    cell: (row) => (
      <div className="ms-1">
        <span>{row.replyCount}</span>
      </div>
    ),
  },
  {
    name: "تعداد لایک",
    reorder: true,
    minWidth: "60px",
    cell: (row) => (
      <div className="ms-1">
        <span>{row.likeCount}</span>
      </div>
    ),
  },
  {
    name: "دیس لایک لایک",
    reorder: true,
    minWidth: "60px",
    cell: (row) => (
      <div className="ms-1">
        <span>{row.dislikeCount}</span>
      </div>
    ),
  },
  {
    name: "وضعیت نظر",
    reorder: true,
    minWidth: "130ox",
    cell: (row) => (
      <div className="text-truncate">
        <Badge
          color={row.accept ? "light-success" : "light-danger"}
          className="course-column-badge"
        >
          {row.accept ? "تایید شده" : "تایید نشده"}
        </Badge>
      </div>
    ),
  },
  {
    name: "عملیات",
    minWidth: "300px",
    cell: (row) => {
      // ** States
      const [modal, setModal] = useState(null);

      // ** Hooks
      const acceptCourseComment = useAcceptCourseComment(row.id);
      const rejectCourseComment = useRejectCourseComment(row.id);
      const deleteCourseComment = useDeleteCourseComment(row.id);

      const toggleModal = (id) => {
        if (modal !== id) {
          setModal(id);
        } else {
          setModal(null);
        }
      };

      const MySwal = withReactContent(Swal);

      const handleReplyClick = () => {
        toggleModal(row.courseId);
      };

      const handleAcceptCourseComment = async () => {
        MySwal.fire({
          title: "آیا از تایید این نظر مطمئن هستید؟",
          text: "در صورت تایید نظر، نظر برای کاربران قابل نمایش خواهد خواهد بود.",
          icon: "warning",
          customClass: {
            confirmButton: "btn btn-primary",
            cancelButton: "btn btn-danger ms-1",
          },
          buttonsStyling: false,
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "بله، نظر را تایید میکنم",
          cancelButtonText: "انصراف",
          showLoaderOnConfirm: true,
          preConfirm() {
            rejectCourseComment.mutate();
          },
        });
      };

      const handleRejectCourseComment = async () => {
        MySwal.fire({
          title: "آیا از لغو این نظر مطمئن هستید؟",
          text: "در صورت لغو نظر، نظر برای کاربران قابل نمایش نخواهد بود.",
          icon: "warning",
          customClass: {
            confirmButton: "btn btn-primary",
            cancelButton: "btn btn-danger ms-1",
          },
          buttonsStyling: false,
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "بله، نظر را لغو میکنم",
          cancelButtonText: "انصراف",
          showLoaderOnConfirm: true,
          preConfirm() {
            acceptCourseComment.mutate();
          },
        });
      };

      const handleDeleteCourseComment = async () => {
        MySwal.fire({
          title: "آیا از حذف این نظر مطمئن هستید؟",
          text: "در صورت حذف نظر، نظر به طور کامل حذف خواهد شد.",
          icon: "warning",
          customClass: {
            confirmButton: "btn btn-primary",
            cancelButton: "btn btn-danger ms-1",
          },
          buttonsStyling: false,
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "حذف",
          cancelButtonText: "انصراف",
          showLoaderOnConfirm: true,
          preConfirm() {
            deleteCourseComment.mutate();
          },
        });
      };

      return (
        <div className="column-action d-flex align-items-center gap-1">
          <div className="d-flex align-items-center gap-2">
            {row.accept ? (
              <div
                className="reject-comment"
                onClick={handleRejectCourseComment}
              >
                <XCircle
                  id="rejectCourseComment"
                  cursor="pointer"
                  className="reject-comment-icon"
                  size={20}
                />
                <span className="reject-comment-text">لغو نظر</span>
              </div>
            ) : (
              <div
                className="reject-comment"
                onClick={handleAcceptCourseComment}
              >
                <CheckCircle
                  id="acceptCourseComment"
                  cursor="pointer"
                  className="accept-comment-icon"
                  size={20}
                />
                <span className="accept-comment-text"> تایید نظر</span>
              </div>
            )}
            <Button color="primary" onClick={handleReplyClick}>
              ریپلای
            </Button>
            <div>
              <Trash
                cursor="pointer"
                size={20}
                className="delete-course-comment"
                onClick={handleDeleteCourseComment}
              />
            </div>
            <CourseReplyCommentModal
              commentId={row.commentId}
              courseId={row.courseId}
              title={row.commentTitle}
              describe={row.describe}
              toggleModal={toggleModal}
              modal={modal}
              courseReserve={[]}
            />
          </div>
        </div>
      );
    },
  },
];
