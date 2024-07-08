// ** React Imports
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Reactstrap Imports
import { Badge, Button } from "reactstrap";

// ** Icon Imports
import { CheckCircle, Trash, XCircle } from "react-feather";

// ** Custom Components
import CourseReplyCommentModal from "./CourseReplyCommentModal";

// ** Core Imports
import { acceptCourseCommentAPI } from "../../../core/services/api/course/course-comments/accept-course-comment.api";
import { deleteCourseCommentAPI } from "../../../core/services/api/course/course-comments/delete-course-comment.api";
import { rejectCourseCommentAPI } from "../../../core/services/api/course/course-comments/reject-course-comment.api";

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
      const navigate = useNavigate();

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
        try {
          const acceptCourseComment = await acceptCourseCommentAPI(row.id);

          if (acceptCourseComment.success) {
            toast.success("نظر با موفقیت تایید شد !");

            navigate(`/courses/${row.courseId}`);
          } else {
            toast.error("مشکلی در تایید نظر به وجود آمد !");
          }
        } catch (error) {
          toast.error("مشکلی در تایید نظر به وجود آمد !");
        }
      };

      const handleRejectCourseComment = async () => {
        try {
          const rejectCourseComment = await rejectCourseCommentAPI(row.id);

          if (rejectCourseComment.success) {
            toast.success("نظر با موفقیت لغو شد !");

            navigate(`/courses/${row.courseId}`);
          } else {
            toast.error("مشکلی در لغو نظر از دید کاربران به وجود آمد !");
          }
        } catch (error) {
          toast.error("مشکلی در لغو نظر از دید کاربران به وجود آمد !");
        }
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
          async preConfirm() {
            const deleteCourseComment = await deleteCourseCommentAPI(row.id);

            if (deleteCourseComment.success) {
              toast.success("نظر با موفقیت حذف شد !");

              navigate(`/courses/${row.courseId}`);
            }
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
