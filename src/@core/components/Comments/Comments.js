// ** React Imports
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Core Imports
import { deleteCourseCommentAPI } from "../../../core/services/api/course/course-comments/delete-course-comment.api";

// ** Comment Components Imports
import CommentCard from "./CommentCard";
import CommentDetails from "./CommentDetails";

// ** Third Party Components
import { Menu, Search, Trash } from "react-feather";

// ** Reactstrap Imports
import { Input, InputGroup, InputGroupText, Label } from "reactstrap";

const Comments = ({
  query,
  setQuery,
  selectComment,
  updateComments,
  openComment,
  setOpenComment,
  setSidebarOpen,
  comments,
  currentPage,
  setCurrentPage,
}) => {
  // ** States
  const [comment, setComment] = useState();
  const [selectedRows, setSelectedRows] = useState([]);

  // ** Hooks
  const navigate = useNavigate();

  // ** Variables
  const labelColors = {
    personal: "success",
    company: "primary",
    important: "warning",
    private: "danger",
  };

  const rowsPerPage = 10;

  const count = Math.ceil(comments?.totalCount / rowsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  // Handle Select All
  const handleSelectAll = () => {
    if (selectedRows.length === comments?.comments.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows([...comments.comments]);
    }
  };

  // ** Handles Update Functions
  const handleCommentClick = (e) => {
    setComment(e);
    setOpenComment(true);
  };

  /*eslint-disable */

  // ** Handles Folder Update
  const handleFolderUpdate = (e) => {
    e.preventDefault();
  };

  // ** Handles Label Update
  const handleLabelsUpdate = (e) => {
    e.preventDefault();
  };

  // ** Handles Comment Read Update
  const handleCommentReadUpdate = (arr, bool) => {};

  // ** Handles Move to Trash
  const handleCommentToTrash = (ids) => {};

  // ** Renders Comment
  const renderComments = () => {
    return comments?.comments.map((comment, index) => {
      return (
        <CommentCard
          comment={comment}
          key={index}
          selectComment={selectComment}
          updateComments={updateComments}
          labelColors={labelColors}
          comments={comments}
          handleCommentClick={() => handleCommentClick(comment)}
          handleCommentReadUpdate={handleCommentReadUpdate}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
      );
    });
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
        if (selectedRows.length) {
          selectedRows.map(async (comment) => {
            const deleteCourseComment = await deleteCourseCommentAPI(
              comment.commentId
            );

            if (deleteCourseComment.success) {
              toast.success("نظر با موفقیت حذف شد !");

              navigate("/comments");
            }
          });
        }
      },
    });
  };

  return (
    <Fragment>
      <div className="email-app-list">
        <div className="app-fixed-search">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mt-1 ml-1 comments-users-text">نظرات کاربران</h2>
            <div>
              <ReactPaginate
                previousLabel={""}
                nextLabel={""}
                breakLabel="..."
                pageCount={Math.ceil(count) || 1}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                activeClassName="active"
                forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                onPageChange={(page) => handlePageClick(page)}
                pageClassName="page-item"
                breakClassName="page-item"
                nextLinkClassName="page-link"
                pageLinkClassName="page-link"
                breakLinkClassName="page-link"
                previousLinkClassName="page-link"
                nextClassName="page-item next-item"
                previousClassName="page-item prev-item"
                containerClassName={
                  "pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
                }
              />
            </div>
          </div>
          <div className="d-flex align-items-center">
            <div
              className="sidebar-toggle d-block d-lg-none ms-1"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size="21" />
            </div>
            <div className="d-flex align-content-center justify-content-between w-100">
              <InputGroup className="input-group-merge">
                <InputGroupText>
                  <Search className="text-muted" size={14} />
                </InputGroupText>
                <Input
                  id="email-search"
                  placeholder="جستجو ..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </InputGroup>
            </div>
          </div>
        </div>
        <div className="app-action">
          <div className="action-left form-check">
            <Input
              type="checkbox"
              id="select-all"
              onChange={handleSelectAll}
              checked={
                selectedRows &&
                selectedRows?.length === comments?.comments?.length
              }
            />
            <Label
              className="form-check-label fw-bolder ps-25 mb-0"
              for="select-all"
            >
              انتخاب همه
            </Label>
          </div>
          {selectedRows?.length ? (
            <div className="action-right">
              <ul className="list-inline m-0">
                <li className="list-inline-item">
                  <span
                    className="action-icon"
                    onClick={handleDeleteCourseComment}
                  >
                    <Trash size={18} />
                  </span>
                </li>
              </ul>
            </div>
          ) : null}
        </div>

        <PerfectScrollbar
          className="email-user-list"
          options={{ wheelPropagation: false }}
        >
          {comments?.totalCount ? (
            <ul className="email-media-list">{renderComments()}</ul>
          ) : (
            <div className="no-results d-block">
              <span>نظری پیدا نشد !</span>
            </div>
          )}
        </PerfectScrollbar>
      </div>
      <CommentDetails
        comment={comment}
        openComment={openComment}
        setOpenComment={setOpenComment}
      />
    </Fragment>
  );
};

export default Comments;
