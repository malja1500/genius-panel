// ** Reactstrap Imports
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
import { addNewsReplyCommentAPI } from "../../../core/services/api/news/add-news-reply-comment.api";

const NewsReplyCommentModal = ({
  commentId,
  newsId,
  title,
  describe,
  toggleModal,
  modal,
}) => {
  // ** States
  const [commentText, setCommentText] = useState();

  // ** Hooks
  const navigate = useNavigate();

  // ** Handle submit function
  const handleSubmit = async () => {
    try {
      const sendReplyComment = await addNewsReplyCommentAPI(
        newsId,
        undefined,
        `ریپلای برای: ${title}`,
        commentText,
        undefined,
        commentId
      );

      if (sendReplyComment.success) {
        toast.success("ریپلای شما با موفقیت ثبت شد !");

        navigate(`/news/${newsId}`);
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
      isOpen={modal === newsId}
      toggle={() => toggleModal(newsId)}
      className="modal-dialog-centered"
      key={newsId}
    >
      <ModalHeader toggle={() => toggleModal(newsId)}>
        <span className="fw-bold">عنوان نظر: </span>
        <span>{title}</span>
      </ModalHeader>
      <ModalBody toggle={() => toggleModal(newsId)}>
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
          disabled={!commentText || commentText.length < 10}
          onClick={handleSubmit}
        >
          ارسال
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default NewsReplyCommentModal;
