// ** Custom Components & Plugins
import classnames from "classnames";

// ** Custom Component Import
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import { Input, Label } from "reactstrap";

// ** Images
import blankThumbnail from "../../../assets/images/common/blank-thumbnail.jpg";

const CommentCard = ({
  comment,
  labelColors,
  handleCommentClick,
  handleCommentReadUpdate,
  selectedRows,
  setSelectedRows,
}) => {
  // ** Function to render labels
  const renderLabels = (arr) => {
    if (arr && arr.length) {
      return arr.map((label) => (
        <span
          key={label}
          className={`bullet bullet-${labelColors[label]} bullet-sm mx-50`}
        ></span>
      ));
    }
  };

  // ** Function to handle read & comment click
  const onCommentClick = () => {
    handleCommentClick(comment.commentId);
    handleCommentReadUpdate([comment.commentId], true);
  };

  return (
    <li
      onClick={() => onCommentClick(comment.commentId)}
      className={classnames("d-flex user-mail", {
        "mail-read": comment.accept,
      })}
    >
      <div className="mail-left pe-50">
        <Avatar img={blankThumbnail} />
        <div className="user-action select-comment-input-wrapper">
          <div className="form-check">
            <Input
              type="checkbox"
              id={`${comment.userFullName}-${comment.commentId}`}
              onChange={(e) => e.stopPropagation()}
              checked={selectedRows?.includes(comment)}
              onClick={(e) => {
                e.stopPropagation();
                if (selectedRows.includes(comment)) {
                  setSelectedRows(
                    selectedRows.filter(
                      (row) => row.commentId !== comment.commentId
                    )
                  );
                } else {
                  setSelectedRows([...selectedRows, comment]);
                }
              }}
            />
            <Label
              onClick={(e) => e.stopPropagation()}
              for={`${comment.userFullName}-${comment.commentId}`}
            ></Label>
          </div>
        </div>
      </div>
      <div className="mail-body">
        <div className="mail-details">
          <div className="mail-items">
            <h5 className="mb-25">{comment.commentTitle}</h5>
            <span className="text-truncate">{comment.courseTitle} دوره</span>
          </div>
          <div className="mail-meta-item">{renderLabels(comment.labels)}</div>
        </div>
        <div className="mail-message">
          <p className="text-truncate mb-0">{comment.describe}</p>
        </div>
      </div>
    </li>
  );
};

export default CommentCard;
