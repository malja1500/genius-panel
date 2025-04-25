// ** React Imports
import { useState } from "react";

// ** Reactstrap Imports
import { Card } from "reactstrap";

// ** Core Imports
import { useCourseGroups } from "../core/services/api/course/course-group/useCourseGroups.api";

// ** Custom Components
import BreadCrumbs from "../@core/components/breadcrumbs";
import CourseGroupsTable from "../@core/components/CourseGroups/CourseGroupsTable";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const CourseGroupsPage = () => {
  // ** States
  const [sort, setSort] = useState("desc");
  const [sortColumn, setSortColumn] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [searchText, setSearchText] = useState();

  // ** Hooks
  const { data: courseGroups, isLoading } = useCourseGroups(
    currentPage,
    rowsPerPage,
    sortColumn,
    sort,
    searchText ? searchText : undefined
  );

  return (
    <div className="invoice-list-wrapper">
      <BreadCrumbs
        title="گروه های دوره"
        data={[
          { title: "مدیریت دوره ها", link: "/courses" },
          { title: "گروه های دوره" },
        ]}
      />
      <Card className="rounded">
        <CourseGroupsTable
          courseGroups={courseGroups}
          isLoading={isLoading}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
          setSearchText={setSearchText}
          setSort={setSort}
          setSortColumn={setSortColumn}
        />
      </Card>
    </div>
  );
};

export default CourseGroupsPage;
