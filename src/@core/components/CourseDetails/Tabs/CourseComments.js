// ** React Imports
import { useState } from "react";
import { useParams } from "react-router-dom";

// ** Reactstrap Imports
import { Card } from "reactstrap";

// ** Core Imports
import { useCourseComments } from "../../../../core/services/api/course/course-comments/useCourseComments.api";

// ** Utility
import { handleDeleteCourseComments } from "../../../../utility/handle-delete-course-comments.utils";
import { showErrorToast } from "../../../../utility/toast.utils";

// ** Columns
import { COURSE_COMMENTS_COLUMNS } from "../../course-columns/course-comments-columns";

// ** Custom Components
import TableServerSide from "../../TableServerSide";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const CourseComments = () => {
  // ** States
  const [filteredData, setFilteredData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [searchText, setSearchText] = useState("");
  const [selectedRows, setSelectedRows] = useState();

  // ** Hooks
  const { id } = useParams();
  const { data: courseComments, isError: isCourseCommentsError } =
    useCourseComments(id);

  if (isCourseCommentsError)
    showErrorToast("مشکلی در دریافت نظرات دوره به وجود آمد !");

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
          handleDeleteData={() => handleDeleteCourseComments(selectedRows)}
          notFoundText="نظری پیدا نشد !"
          deleteSelectedRowsText="حذف"
          handleSearchFilter={handleFilter}
        />
      </Card>
    </div>
  );
};

export default CourseComments;
