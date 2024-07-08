// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Reactstrap Imports
import { Card } from "reactstrap";

// ** Core Imports
import { deleteCourseCommentAPI } from "../../../../core/services/api/course/course-comments/delete-course-comment.api";
import { getCourseCommentsAPI } from "../../../../core/services/api/course/course-comments/get-course-comments.api";

// ** Columns
import { COURSE_COMMENTS_COLUMNS } from "../../course-columns/course-comments-columns";

// ** Custom Components
import TableServerSide from "../../TableServerSide";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const CourseComments = () => {
  // ** States
  const [courseComments, setCourseComments] = useState();
  const [filteredData, setFilteredData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [searchText, setSearchText] = useState("");
  const [selectedRows, setSelectedRows] = useState();

  // ** Hooks
  const { id } = useParams();
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  const handleDeleteCourseComment = async (selectedRows) => {
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
        selectedRows.map(async (comment) => {
          const deleteCourseComment = await deleteCourseCommentAPI(comment.id);

          if (deleteCourseComment.success) {
            toast.success("نظر با موفقیت حذف شد !");

            navigate(`/courses/${id}`);
          }
        });
      },
    });
  };

  // ** Function to handle filter
  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchText(value);

    if (value.length) {
      updatedData = courseComments.filter((comment) => {
        const startsWith = comment.title
          .toLowerCase()
          .startsWith(value.toLowerCase());

        const includes = comment.title
          .toLowerCase()
          .includes(value.toLowerCase());
        comment.author.toLowerCase().includes(value.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData(updatedData);
      setSearchText(value);
    }
  };

  useEffect(() => {
    const fetchCourseComments = async () => {
      try {
        const getCourseComments = await getCourseCommentsAPI(id);

        setCourseComments(getCourseComments);
      } catch (error) {
        toast.error("مشکلی در دریافت نظرات دوره به وجود آمد !");
      }
    };
    fetchCourseComments();
  }, []);

  return (
    <div className="invoice-list-wrapper course-details-comments-tab">
      <Card className="rounded">
        <TableServerSide
          data={searchText.length ? filteredData : courseComments}
          columns={COURSE_COMMENTS_COLUMNS}
          renderTitle="نظرات کاربران"
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
          setSearchValue={setSearchText}
          setSelectedRows={setSelectedRows}
          selectableRows
          handleDeleteData={() => handleDeleteCourseComment(selectedRows)}
          notFoundText="نظری پیدا نشد !"
          deleteSelectedRowsText="حذف"
          handleSearchFilter={handleFilter}
        />
      </Card>
    </div>
  );
};

export default CourseComments;
