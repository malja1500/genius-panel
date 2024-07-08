// ** React Imports
import { useState } from "react";

// ** Reactstrap Imports
import { Button } from "reactstrap";

// ** Custom Components
import NewsReplyCommentModal from "./NewsReplyCommentModal";

// ** Image Imports
import blankThumbnail from "../../../assets/images/common/blank-thumbnail.jpg";

export const NEWS_COMMENTS_COLUMNS = [
  {
    name: "نام کاربر",
    reorder: true,
    minWidth: "200px",
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
          <span>{row.autor}</span>
        </div>
      </div>
    ),
  },
  {
    name: "عنوان نظر",
    reorder: true,
    minWidth: "220px",
    cell: (row) => (
      <div className="text-truncate ms-1">
        <span>{row.title}</span>
      </div>
    ),
  },
  {
    name: "تعداد لایک",
    reorder: true,
    width: "130px",
    cell: (row) => (
      <div className="text-truncate ms-1">
        <span>{row.likeCount}</span>
      </div>
    ),
  },
  {
    name: "عملیات",
    minWidth: "140px",
    cell: (row) => {
      // ** States
      const [modal, setModal] = useState(null);

      const toggleModal = (id) => {
        if (modal !== id) {
          setModal(id);
        } else {
          setModal(null);
        }
      };

      const handleReplyClick = () => {
        toggleModal(row.newsId);
      };

      return (
        <div className="column-action d-flex align-items-center gap-1">
          <div className="d-flex align-items-center gap-2">
            <Button color="primary" onClick={handleReplyClick} outline>
              مشاهده
            </Button>
            <NewsReplyCommentModal
              commentId={row.id}
              newsId={row.newsId}
              title={row.title}
              describe={row.describe}
              toggleModal={toggleModal}
              modal={modal}
            />
          </div>
        </div>
      );
    },
  },
];
