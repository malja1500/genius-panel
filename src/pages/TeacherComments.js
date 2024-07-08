// ** React Imports
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

// ** Comment App Component Imports
import Comments from "../@core/components/Comments/Comments";
import Sidebar from "../@core/components/Comments/Sidebar";

// ** Third Party Components
import classnames from "classnames";

// ** Styles
import "@styles/react/apps/app-email.scss";

// ** Core Imports
import { teacherCommentManagementAPI } from "../core/services/api/comment/teacher-comment-management.api";

const TeacherCommentsPage = () => {
  // ** States
  const [allComments, setAllComments] = useState([]);
  const [comments, setComments] = useState([]);
  const [acceptedComments, setAcceptedComments] = useState(0);
  const [notAcceptedComments, setNotAcceptedComments] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [openComment, setOpenComment] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAcceptedComments, setIsAcceptedComments] = useState();

  // ** Vars
  const params = useParams();

  // ** UseEffect: GET initial data on Mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const getAllComments = await teacherCommentManagementAPI(1, 10000);
        const getComments = await teacherCommentManagementAPI(currentPage, 10);
        const getAcceptedComments = await teacherCommentManagementAPI(
          currentPage,
          10000,
          undefined,
          undefined,
          undefined,
          true
        );
        const getNotAcceptedComments = await teacherCommentManagementAPI(
          currentPage,
          10000,
          undefined,
          undefined,
          undefined,
          false
        );

        setAllComments(getAllComments);
        setComments(getComments);
        setAcceptedComments(getAcceptedComments?.totalCount);
        setNotAcceptedComments(getNotAcceptedComments?.totalCount);
      } catch (error) {
        toast.error("مشکلی در دریافت نظرات یه وجود آمد !");
      }
    };

    fetchComments();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const getComments = await teacherCommentManagementAPI(
          currentPage,
          10,
          undefined,
          undefined,
          query,
          params.folder === "accepted" ? true : params.folder === "not-accepted"
        );

        setComments(getComments);
      } catch (error) {
        toast.error("مشکلی در دریافت نظرات یه وجود آمد !");
      }
    };

    fetchComments();
  }, [query, isAcceptedComments, params.label, params.folder, currentPage]);

  return (
    <Fragment>
      <Sidebar
        allComments={allComments}
        sidebarOpen={sidebarOpen}
        setOpenComment={setOpenComment}
        setSidebarOpen={setSidebarOpen}
        setIsAcceptedComments={setIsAcceptedComments}
        isAcceptedComments={isAcceptedComments}
        acceptedComments={acceptedComments}
        notAcceptedComments={notAcceptedComments}
      />
      <div className="content-right">
        <div className="content-body">
          <div
            className={classnames("body-content-overlay", {
              show: sidebarOpen,
            })}
            onClick={() => setSidebarOpen(false)}
          ></div>
          <Comments
            comments={comments}
            query={query}
            setQuery={setQuery}
            openComment={openComment}
            setOpenComment={setOpenComment}
            setSidebarOpen={setSidebarOpen}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default TeacherCommentsPage;
