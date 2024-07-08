// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// ** Reactstrap Imports
import { Card } from "reactstrap";

// ** Core Imports
import { getCourseGroupsAPI } from "../core/services/api/course/course-group/get-course-groups.api";

// ** Custom Components
import BreadCrumbs from "../@core/components/breadcrumbs";
import CourseGroupsTable from "../@core/components/CourseGroups/CourseGroupsTable";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const CourseGroupsPage = () => {
  // ** States
  const [courseGroups, setCourseGroups] = useState();
  const [sort, setSort] = useState("desc");
  const [sortColumn, setSortColumn] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [searchText, setSearchText] = useState();

  useEffect(() => {
    const fetchCourseGroups = async () => {
      try {
        const getCourseGroups = await getCourseGroupsAPI(
          currentPage,
          rowsPerPage
        );

        setCourseGroups(getCourseGroups);
      } catch (error) {
        toast.error("مشکلی در دریافت گروه های دوره به وجود آمد !");
      }
    };

    fetchCourseGroups();
  }, []);

  useEffect(() => {
    const fetchCourseGroups = async () => {
      try {
        const getCourseGroups = await getCourseGroupsAPI(
          currentPage,
          rowsPerPage,
          sortColumn,
          sort,
          searchText
        );

        setCourseGroups(getCourseGroups);
      } catch (error) {
        toast.error("مشکلی در دریافت گروه های دوره به وجود آمد !");
      }
    };

    fetchCourseGroups();
  }, [searchText, sort, sortColumn, currentPage, rowsPerPage]);

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
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          searchText={searchText}
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
