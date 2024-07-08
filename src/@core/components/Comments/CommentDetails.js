// ** React Imports
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Core Imports
import { addReplyCommentAPI } from "../../../core/services/api/course/course-comments/add-reply-course-comment.api";
import { deleteCourseCommentAPI } from "../../../core/services/api/course/course-comments/delete-course-comment.api";

// ** Utils
import { onFormData } from "../../../utility/form-data-helper.utils";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import classnames from "classnames";

import {
  CheckCircle,
  ChevronLeft,
  MoreVertical,
  Trash2,
  XCircle,
} from "react-feather";

// ** Reactstrap Imports
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import { acceptCourseCommentAPI } from "../../../core/services/api/course/course-comments/accept-course-comment.api";
import { rejectCourseCommentAPI } from "../../../core/services/api/course/course-comments/reject-course-comment.api";

const CommentDetails = ({ comment, openComment, setOpenComment }) => {
  // ** States
  const [commentTitle, setCommentTitle] = useState();
  const [commentText, setCommentText] = useState();

  // ** Hooks
  const navigate = useNavigate();

  // ** Handle submit function
  const handleSubmit = async () => {
    try {
      const commentData = {
        commentId: comment.commentId,
        courseId: comment.courseId,
        title: commentTitle,
        describe: commentText,
      };

      const commentFormData = onFormData(commentData);

      const sendReplyComment = await addReplyCommentAPI(commentFormData);

      if (sendReplyComment.success) {
        toast.success("ریپلای شما با موفقیت ثبت شد !");

        navigate(`/comments`);
      } else {
        toast.error("مشکلی در ارسال ریپلای شما به وجود آمد !");
        toast.error(sendReplyComment.ErrorMessage[0]);
      }
    } catch (error) {
      toast.error("مشکلی در ارسال ریپلای شما به وجود آمد !");
    }
  };

  // ** Handle go back
  const handleGoBack = () => {
    setOpenComment(false);
  };

  const MySwal = withReactContent(Swal);

  const handleDeleteCourseComment = async () => {
    MySwal.fire({
      title: "آیا از حذف نظر مطمئن هستید؟",
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
        const deleteCourseComment = await deleteCourseCommentAPI(
          comment.commentId
        );

        if (deleteCourseComment.success) {
          toast.success("نظر با موفقیت حذف شد !");

          setOpenComment(false);

          navigate("/comments");
        }
      },
    });
  };

  const handleAcceptRejectComment = async () => {
    MySwal.fire({
      title: `آیا از ${
        comment?.accept ? "لغو" : "تایید"
      } کردن نظر مطمئن هستید؟`,
      text: comment?.accept
        ? "در صورت لغو نظر، نظر برای کاربران قابل نمایش نخواهد بود ."
        : "در صورت تایید نظر، نظر برای کاربران قابل رویت خواهد بود.",
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
      confirmButtonText: comment?.accept
        ? "بله، میخوام نظر را لغو کنم"
        : "بله، میخواهم نظر را تایید کنم",
      cancelButtonText: "انصراف",
      showLoaderOnConfirm: true,
      async preConfirm() {
        const acceptRejectComment = comment?.accept
          ? await rejectCourseCommentAPI(comment.commentId)
          : await acceptCourseCommentAPI(comment?.commentId);

        if (acceptRejectComment.success) {
          toast.success(
            `نظر با موفقیت ${comment.accept ? "لغو" : "تایید"} شد !`
          );

          navigate("/comments");
        } else {
          toast.error(
            `مشکلی در ${comment.accept ? "لغو" : "تایید"} نظر به وجود آمد !`
          );
        }
      },
    });
  };

  // ** Renders Messages
  const renderMessage = (obj) => {
    return (
      <Card className="mt-1">
        <CardHeader className="email-detail-head">
          <div className="user-details d-flex justify-content-between align-items-center flex-wrap">
            <Avatar
              img={obj.describe}
              className="me-75"
              imgHeight="48"
              imgWidth="48"
            />
            <div className="mail-items">
              <h5 className="mb-0">{obj.commentTitle}</h5>
              <UncontrolledDropdown className="email-info-dropup">
                <DropdownToggle
                  className="font-small-3 text-muted cursor-pointer"
                  tag="span"
                  caret
                >
                  <span className="me-25">{obj.commentTitle}</span>
                </DropdownToggle>
              </UncontrolledDropdown>
            </div>
          </div>
          <div className="mail-meta-item d-flex align-items-center">
            <UncontrolledDropdown className="ms-50">
              <DropdownToggle className="cursor-pointer" tag="span">
                <MoreVertical size={14} />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem
                  className="d-flex align-items-center w-100"
                  onClick={handleDeleteCourseComment}
                >
                  <Trash2 className="me-50" size={14} />
                  حذف
                </DropdownItem>
                <DropdownItem
                  className="d-flex align-items-center w-100"
                  onClick={handleAcceptRejectComment}
                >
                  {comment?.accept ? (
                    <XCircle className="me-50" size={14} />
                  ) : (
                    <CheckCircle className="me-50" size={14} />
                  )}
                  {comment?.accept ? "غیر فعال کردن" : "فعال کردن"}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </CardHeader>
        <CardBody className="mail-message-wrapper pt-2">
          <div
            className="mail-message"
            dangerouslySetInnerHTML={{ __html: obj.describe }}
          ></div>
        </CardBody>
      </Card>
    );
  };

  return (
    <div
      className={classnames("email-app-details comment-details", {
        show: openComment,
      })}
    >
      {comment !== null && comment !== undefined ? (
        <Fragment>
          <div className="email-detail-header">
            <div className="email-header-left d-flex align-items-center">
              <span className="go-back me-1" onClick={handleGoBack}>
                <ChevronLeft size={20} />
              </span>
              <h4 className="email-subject mb-0">{comment.commentTitle}</h4>
            </div>
          </div>
          <PerfectScrollbar
            className="email-scroll-area"
            options={{ wheelPropagation: false }}
          >
            <Row>
              <Col sm="12">{renderMessage(comment)}</Col>
            </Row>
            <Row>
              <Col sm="12">
                <Card>
                  <CardBody>
                    <h5 className="mb-0">
                      برای <span className="text-primary">ریپلای کردن</span> این
                      نظر فقط کافی است فرم زیر را تکمیل کنید !
                    </h5>
                    <div className="mt-1 d-flex flex-column gap-1">
                      <div>
                        <Label for="replyTitle">پیام شما:</Label>
                        <Input
                          id="replyTitle"
                          placeholder="عنوان نظر شما ..."
                          onChange={(e) => setCommentTitle(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label for="replyText">پیام شما:</Label>
                        <Input
                          type="textarea"
                          id="replyText"
                          placeholder="پیام شما ..."
                          onChange={(e) => setCommentText(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button
                      color="primary"
                      disabled={
                        !commentText ||
                        commentText.length < 5 ||
                        !commentTitle ||
                        commentTitle.length < 5
                      }
                      className="mt-1"
                      onClick={handleSubmit}
                    >
                      ارسال
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </PerfectScrollbar>
        </Fragment>
      ) : null}
    </div>
  );
};

export default CommentDetails;
