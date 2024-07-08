// ** Reactstrap Imports
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

// ** Reactstrap Imports
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

// ** Core Imports
import { addReplyCommentAPI } from "../../../core/services/api/course/course-comments/add-reply-course-comment.api";

// ** Utils
import { onFormData } from "../../../utility/form-data-helper.utils";

const CourseReplyCommentModal = ({
  commentId,
  courseId,
  title,
  describe,
  toggleModal,
  modal,
}) => {
  // ** States
  const [commentText, setCommentText] = useState();

  // ** Hooks
  const navigate = useNavigate();
  const { id } = useParams();

  // ** Handle submit function
  const handleSubmit = async () => {
    try {
      const commentData = {
        commentId,
        courseId,
        title: `ریپلای برای: ${title}`,
        describe: commentText,
      };

      const comment = onFormData(commentData);

      const sendReplyComment = await addReplyCommentAPI(comment);

      if (sendReplyComment.success) {
        toast.success("ریپلای شما با موفقیت ثبت شد !");

        navigate(`/courses/${id}`);
      } else {
        toast.error("مشکلی در ارسال ریپلای شما به وجود آمد !");
        toast.error(sendReplyComment.ErrorMessage[0]);
      }
    } catch (error) {
      toast.error("مشکلی در ارسال ریپلای شما به وجود آمد !");
    }
  };

  return (
    <Modal
      isOpen={modal === courseId}
      toggle={() => toggleModal(courseId)}
      className="modal-dialog-centered"
      key={courseId}
    >
      <ModalHeader toggle={() => toggleModal(courseId)}>
        <span className="fw-bold">عنوان نظر: </span>
        <span>{title}</span>
      </ModalHeader>
      <ModalBody toggle={() => toggleModal(courseId)}>
        <div className="d-flex mt-1 course-reply-comment-text">
          <span className="fw-bold">پیام: </span>
          <p>{describe}</p>
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
      </ModalBody>
      <ModalFooter className="d-flex justify-content-start">
        <Button
          color="primary"
          disabled={!commentText || commentText.length < 5}
          onClick={handleSubmit}
        >
          ارسال
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CourseReplyCommentModal;
