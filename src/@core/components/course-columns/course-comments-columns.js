// ** React Imports
import { useState } from "react";

// ** Reactstrap Imports
import { Badge, Button } from "reactstrap";

// ** Icon Imports
import { CheckCircle, Trash, XCircle } from "react-feather";

// ** Custom Components
import CourseReplyCommentModal from "./CourseReplyCommentModal";

// ** Core Imports
import { useAcceptCourseComment } from "../../../core/services/api/course/course-comments/useAcceptCourseComment.api";
import { useRejectCourseComment } from "../../../core/services/api/course/course-comments/useRejectCourseComment.api";

// ** Utility
import { useHandleDeleteCourseComment } from "../../../utility/handle-delete-course-comment.utils";

// ** Image Imports
import blankThumbnail from "../../../assets/images/common/blank-thumbnail.jpg";

export const COURSE_COMMENTS_COLUMNS = [
  {
    name: "عنوان نظر",
    reorder: true,
    minWidth: "160px",
    cell: (row) => (
      <div className="d-flex align-items-center">
        <img
          src={
            row?.pictureAddress !== "Not-set" && row?.pictureAddress !== null
              ? row?.pictureAddress
              : blankThumbnail
          }
          className="student-course-reserve-picture"
        />
        <div className="text-truncate ms-1">
          <span>{row.title}</span>
        </div>
      </div>
    ),
  },
  {
    name: "نام کاربر",
    reorder: true,
    minWidth: "130px",
    cell: (row) => (
      <div className="text-truncate ms-1">
        <span>{row.author}</span>
      </div>
    ),
  },
  {
    name: "تعداد لایک",
    reorder: true,
    minWidth: "60px",
    cell: (row) => (
      <div className="text-truncate ms-1">
        <span>{row.likeCount}</span>
      </div>
    ),
  },
  {
    name: "تعداد ریپلای های تایید شده",
    reorder: true,
    minWidth: "120px",
    cell: (row) => (
      <div className="text-truncate ms-1">
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
      const deleteCourseComment = useHandleDeleteCourseComment();

      const toggleModal = (id) => {
        if (modal !== id) {
          setModal(id);
        } else {
          setModal(null);
        }
      };

      const handleReplyClick = () => {
        toggleModal(row.courseId);
      };

      const handleAcceptCourseComment = async () => {
        acceptCourseComment.mutate();
      };

      const handleRejectCourseComment = async () => {
        rejectCourseComment.mutate();
      };

      const handleDeleteCourseComment = () => {
        deleteCourseComment(row.id);
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
              commentId={row.id}
              courseId={row.courseId}
              title={row.title}
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
